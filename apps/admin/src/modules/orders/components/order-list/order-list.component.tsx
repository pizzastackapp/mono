import { Orders } from '@app/core/types';
import {
  ChipField,
  Datagrid,
  DateField,
  FunctionField,
  List,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  TextField,
} from 'react-admin';

const filters = [
  <ReferenceInput
    source="status"
    reference="order_status"
    label="Статус замовлення"
  >
    <SelectInput optionText="label" label="Статус" />
  </ReferenceInput>,
];

export const OrderList = () => (
  <List
    exporter={false}
    filters={filters}
    sort={{ field: 'created_at', order: 'DESC' }}
  >
    <Datagrid rowClick="show" bulkActionButtons={false}>
      <TextField source="client_address" label="Адреса" />
      <TextField source="client_name" label="Ім'я" />
      <TextField source="client_phone" label="Телефон" />
      <ReferenceField
        reference="order_status"
        source="status"
        label="Статус замовлення"
        link={false}
      >
        <ChipField source="label" />
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
    </Datagrid>
  </List>
);
