import { CustomTitle } from '@app/common/components/custom-title/custom-title.component';
import { Orders } from '@app/core/types';
import {
  Datagrid,
  DateField,
  FunctionField,
  ReferenceManyField,
  Show,
  SimpleShowLayout,
  TextField,
} from 'react-admin';

export const CustomerShow = () => (
  <Show title={<CustomTitle source="name" />}>
    <SimpleShowLayout>
      <TextField source="address" />
      <TextField source="name" />
      <TextField source="phone" />
      <ReferenceManyField
        target="client_phone"
        reference="orders"
        source="phone"
        label="Замовлення"
        sort={{ field: 'created_at', order: 'DESC' }}
      >
        <Datagrid bulkActionButtons={false} rowClick="show">
          <DateField
            source="created_at"
            label="Дата"
            showTime
            options={{ timeZone: 'Europe/Kiev' }}
          />
          <FunctionField
            label="Сума"
            source="sum"
            render={(record: Orders) => `${record.sum} грн.`}
          />
        </Datagrid>
      </ReferenceManyField>
    </SimpleShowLayout>
  </Show>
);
