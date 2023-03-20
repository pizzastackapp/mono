import { Handler } from '@netlify/functions';
import { verifyHasura } from '../common/verifyHasura';
import { HasuraEventBody, HasuraEvents } from '../dto/hasura-event-body.dto';
import { createNewCustomer } from '../hasura/create-new-customer';
import { sendNotificationToAdmin } from '../hasura/send-notifcation-to-admin';
import { setPaymentStatus } from '../hasura/set-payment-status';

const handler: Handler = async (event, context) => {
  const { headers, body: bodyRaw } = event;

  try {
    verifyHasura(headers);
  } catch (error) {
    return JSON.parse(error.message);
  }

  const body = JSON.parse(bodyRaw) as HasuraEventBody;

  const {
    trigger: { name: triggerName },
  } = body;

  if (triggerName === HasuraEvents.ORDER_CREATED) {
    await Promise.all([createNewCustomer(body), sendNotificationToAdmin(body)]);
  } else if (triggerName === HasuraEvents.ORDER_UPDATED) {
    await setPaymentStatus(body);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      status: 'ok',
    }),
  };
};

export { handler };
