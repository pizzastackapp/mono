import { Order_Status_Enum } from '@app/core/types';
import { MenuOrderInput } from '@app/modules/orders/components/menu-order-input/menu-order-input.component';
import { useMenuOrderInput } from '@app/modules/orders/hooks/use-menu-order-input.hook';
import {
  JoinedOrdersMenuItem,
  OrderForm,
} from '@app/modules/orders/order.types';
import { useRef } from 'react';
import {
  Create,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  useRedirect,
} from 'react-admin';

export const OrderCreate = () => {
  const { mutate } = useMenuOrderInput();

  const newReferences = useRef<JoinedOrdersMenuItem[]>([]);
  const transform = (data: OrderForm) => {
    newReferences.current = data.joined_orders_menu;
    return data;
  };

  const redirect = useRedirect();
  const onSuccess = async (data: Omit<OrderForm, 'joined_orders_menu'>) => {
    await mutate({
      id: data.id,
      newReferences: newReferences.current,
    });
    redirect('show', 'orders', data.id);
  };

  return (
    <Create
      title="Нове замовлення"
      transform={transform}
      mutationOptions={{ onSuccess }}
    >
      <SimpleForm>
        <TextInput source="client_address" label="Адреса" fullWidth />
        <TextInput source="client_name" label="Ім'я" />
        <TextInput source="client_phone" label="Телефон" />
        <ReferenceInput source="status" reference="order_status">
          <SelectInput
            optionText="label"
            label="Статус замовлення"
            defaultValue={Order_Status_Enum.New}
            disabled
          />
        </ReferenceInput>
        <MenuOrderInput />
      </SimpleForm>
    </Create>
  );
};
