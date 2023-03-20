import { api } from '../common/api';
import { HasuraEventBody } from '../dto/hasura-event-body.dto';

export const createNewCustomer = async (body: HasuraEventBody) => {
  const {
    event: {
      data: { new: order },
    },
  } = body;

  try {
    await api.CreateNewCustomer({
      phone: order.client_phone,
      name: order.client_name,
      address: order.client_address,
    });
  } catch (error) {
    console.log('Error on creating new customer', {
      phone: order.client_phone,
      name: order.client_name,
      address: order.client_address,
    });
  }
};
