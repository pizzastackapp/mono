import { getManyReferenceFilter } from '@app/common/data/get-many-reference-filter';
import { FC, useEffect, useState } from 'react';
import {
  ArrayInput,
  AutocompleteInput,
  NumberInput,
  SimpleFormIterator,
  useDataProvider,
  useGetList,
  useRecordContext,
} from 'react-admin';
import { useFormContext } from 'react-hook-form';

interface MenuOrderInputProps {}

export const MenuOrderInput: FC<MenuOrderInputProps> = () => {
  const record = useRecordContext();
  const dataProvider = useDataProvider();
  const { setValue } = useFormContext();

  const menuItems = useGetList('menu');

  const [joinedEntities, setJoinedEntities] = useState<any[]>([]);

  useEffect(() => {
    if (!record) return;

    const fetchJoinReferences = async () => {
      const entities = await dataProvider.getManyReference('orders_menu', {
        id: record.id,
        target: 'order_id',
        ...getManyReferenceFilter,
      });

      setJoinedEntities(entities.data);
    };

    fetchJoinReferences();
  }, []);

  useEffect(() => {
    setValue('joined_orders_menu', joinedEntities);
  }, [joinedEntities]);

  return (
    <ArrayInput source="joined_orders_menu" label="Замовлення">
      <SimpleFormIterator inline>
        <AutocompleteInput
          choices={menuItems.data}
          translateChoice={false}
          optionText="title"
          source="menu_id"
          label="Позиція меню"
          sx={{ width: 600 }}
        />
        <NumberInput source="amount" label="Кількість" />
      </SimpleFormIterator>
    </ArrayInput>
  );
};
