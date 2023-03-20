import { Datagrid, List, TextField } from 'react-admin';

export const CustomerList = () => (
  <List exporter={false}>
    <Datagrid bulkActionButtons={false} rowClick="show">
      <TextField source="name" label="Імʼя" />
      <TextField source="phone" label="Телефон" />
      <TextField source="address" label="Адреса" />
    </Datagrid>
  </List>
);
