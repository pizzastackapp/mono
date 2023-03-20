import { Datagrid, FunctionField, List } from 'react-admin';
import { Categories } from '@app/core/types';

export const CategoryList = () => (
  <List exporter={false}>
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <FunctionField
        render={(record: Categories) => `${record.emoji} ${record.title}`}
      />
    </Datagrid>
  </List>
);
