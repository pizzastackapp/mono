import { MenuOrderInput } from '@app/modules/orders/components/menu-order-input/menu-order-input.component';
import { useMenuOrderInput } from '@app/modules/orders/hooks/use-menu-order-input.hook';
import { OrderForm } from '@app/modules/orders/order.types';
import {
  Edit,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from 'react-admin';

export const OrderEdit = () => {
  const { mutate } = useMenuOrderInput();

  const transform = async (data: OrderForm) => {
    await mutate({
      id: data.id,
      newReferences: data.joined_orders_menu,
    });

    return data;
  };

  return (
    <Edit mutationMode="pessimistic" transform={transform}>
      <SimpleForm>
        <TextInput source="client_address" label="Адреса" fullWidth />
        <TextInput source="client_name" label="Ім'я" />
        <TextInput source="client_phone" label="Телефон" />
        <ReferenceInput source="status" reference="order_status">
          <SelectInput optionText="label" label="Статус замовлення" />
        </ReferenceInput>
        <ReferenceInput source="payment_status" reference="payment_status">
          <SelectInput optionText="label" label="Статус оплати" />
        </ReferenceInput>
        <MenuOrderInput />
      </SimpleForm>
    </Edit>
  );
};
