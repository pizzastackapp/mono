import { Orders, Order_Status_Enum } from '@app/core/types';
import { InlineStatusEdit } from '@app/modules/orders/components/inline-status-edit/inline-status-edit.component';
import {
  Datagrid,
  DateField,
  EditButton,
  FunctionField,
  List,
  ReferenceField,
  TextField,
} from 'react-admin';

export const NewOrders = () => {
  return (
    <List
      resource="orders"
      hasCreate={false}
      exporter={false}
      filter={{
        'status@_in': [
          Order_Status_Enum.New,
          Order_Status_Enum.InProgress,
          Order_Status_Enum.Done,
        ],
      }}
    >
      <Datagrid bulkActionButtons={false} rowClick="show">
        <InlineStatusEdit label="Статус замовлення" />
        <ReferenceField
          reference="payment_status"
          source="payment_status"
          label="Статус замовлення"
          link={false}
        >
          <TextField source="label" />
        </ReferenceField>
        <DateField
          source="created_at"
          label="Створено"
          showTime
          options={{ timeZone: 'Europe/Kiev' }}
        />
        <FunctionField
          label="Сума"
          source="sum"
          render={(record: Orders) => `${record.sum} грн.`}
        />
        <EditButton />
      </Datagrid>
    </List>
  );
};
