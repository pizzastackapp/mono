import axios, { AxiosError } from 'axios';
import { api } from '../common/api';
import { Order_Status_Enum } from '../common/sdk';
import { config } from '../core/config';
import { HasuraEventBody } from '../dto/hasura-event-body.dto';

export const sendNotificationToAdmin = async (body: HasuraEventBody) => {
  const {
    event: {
      data: { new: order },
    },
  } = body;

  if (order.status === Order_Status_Enum.New) {
    const admins = await api.GetAdmins();
    const ids = admins.admin.map((admin) => admin.id);

    try {
      await axios.post(
        'https://onesignal.com/api/v1/notifications',
        {
          app_id: config.onesignalAppId,
          include_external_user_ids: ids,
          contents: {
            en: 'Нове замовлення',
          },
          name: `NEW_ORDER_${order.id}`,
          url: `${config.adminFrontendUrl}/#/orders/${order.id}/show`,
        },
        {
          headers: {
            Authorization: `Basic ${config.onesignalApiKey}`,
          },
        }
      );
    } catch (error) {
      console.log(
        'Error sending notifcation to admin',
        (error as AxiosError).response.data
      );
    }
  }
};
