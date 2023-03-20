import { api } from '../common/api';
import { Order_Status_Enum, Payment_Status_Enum } from '../common/sdk';
import { HasuraEventBody } from '../dto/hasura-event-body.dto';

export const setPaymentStatus = async (body: HasuraEventBody) => {
  const { new: newOrder, old } = body.event.data;

  if (
    newOrder.status === Order_Status_Enum.Delivered &&
    old.status !== Order_Status_Enum.Delivered
  ) {
    await api.UpdateOrderPaymentStatusById({
      id: newOrder.id,
      payment_status: Payment_Status_Enum.Succeeded,
    });
  } else if (
    newOrder.status === Order_Status_Enum.Canceled &&
    old.status !== Order_Status_Enum.Canceled
  ) {
    await api.UpdateOrderPaymentStatusById({
      id: newOrder.id,
      payment_status: Payment_Status_Enum.Failed,
    });
  }
};
