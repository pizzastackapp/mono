import { Handler } from '@netlify/functions';
import axios from 'axios';
import { api } from '../common/api';
import { generateSignature } from '../common/fondy';
import {
  CreateOrderInput,
  Payment_Status_Enum,
  Payment_Types_Enum,
} from '../common/sdk';
import { verifyHasura } from '../common/verifyHasura';
import { config } from '../core/config';
import { FondyCheckoutUrlResponse } from '../dto/fondy-checkout-url-response.dto';

const createOrder = async (input: CreateOrderInput): Promise<string> => {
  const paymentType = input.payment_type as Payment_Types_Enum;

  const order = await api.CreateOrder({
    client_address: input.client_address,
    client_name: input.client_name,
    client_phone: input.client_phone,
    comment: input.comment,
    payment_type: paymentType,
    payment_status: Payment_Status_Enum.Processing,
  });

  const menuItems = input.items.split(',').map((orderItem) => {
    const [menu_id, amount] = orderItem.split('_');

    return {
      order_id: order.insert_orders_one.id,
      menu_id,
      amount,
    };
  });

  await api.AddItemsToOrder({
    objects: menuItems,
  });

  return order.insert_orders_one.id;
};

const sendPaymentIntent = async (orderBody) => {
  const signature = generateSignature(orderBody);

  try {
    const fondyRepsonse = await axios.post<FondyCheckoutUrlResponse>(
      'https://pay.fondy.eu/api/checkout/url/',
      {
        request: {
          ...orderBody,
          signature,
        },
      }
    );

    if (fondyRepsonse.data.response.error_message) {
      throw new Error(fondyRepsonse.data.response.error_message);
    }

    return fondyRepsonse.data;
  } catch (e) {
    console.log(e);

    await api.DeleteOrderById({ id: orderBody.order_id });

    throw new Error(
      JSON.stringify({
        statusCode: 418,
        body: JSON.stringify({
          message:
            'Упс, щось трапилось з платіжним сервісом. Спробуйте будь-ласка пізніше або оберіть інший вид оплати',
        }),
      })
    );
  }
};

const createFondyPaymentLink = async (
  input: CreateOrderInput,
  orderId: string
) => {
  const items = input.items.split(',').reduce((acc, item) => {
    const [menu_id, amount] = item.split('_');

    return {
      ...acc,
      [menu_id]: amount,
    };
  }, {});

  const menuItemsDescriptions = await api.GetMenuItemsById({
    ids: Object.keys(items),
  });

  const orderDescription = menuItemsDescriptions.menu
    .map((item) => `${item.title} x${items[item.id]}`)
    .join(',');

  const orderPrice = menuItemsDescriptions.menu.reduce(
    (acc, item) => acc + item.price * items[item.id],
    0
  );

  const orderBody = {
    order_id: orderId,
    merchant_id: config.fondyMerchantId,
    order_desc: orderDescription,
    amount: orderPrice * 100,
    currency: 'UAH',
    response_url: `${config.serverlessUrl}/redirect?url=${config.clientFrontendUrl}/checkout/thank-you`,
    server_callback_url: `${config.serverlessUrl}/fondy`,
  };

  let data;
  try {
    data = await sendPaymentIntent(orderBody);
  } catch (error) {
    throw error;
  }

  await api.UpdateOrderPaymentId({
    id: orderId,
    payment_id: Number(data.response.payment_id),
  });

  return data.response.checkout_url;
};

const handler: Handler = async (event, context) => {
  const { headers, body } = event;

  try {
    verifyHasura(headers);
  } catch (error) {
    return JSON.parse(error.message);
  }

  const input: CreateOrderInput = JSON.parse(body!).input.order;
  const orderId = await createOrder(input);

  let checkoutUrl = null;
  if (input.payment_type === Payment_Types_Enum.Online) {
    try {
      checkoutUrl = await createFondyPaymentLink(input, orderId);
    } catch (error) {
      return JSON.parse(error.message);
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      id: orderId,
      checkout_url: checkoutUrl,
    }),
  };
};

export { handler };
