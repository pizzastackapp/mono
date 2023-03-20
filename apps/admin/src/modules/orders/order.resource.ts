import { OrderCreate } from '@app/modules/orders/components/order-create/order-create.component';
import { OrderEdit } from '@app/modules/orders/components/order-edit/order-edit.component';
import { OrderList } from '@app/modules/orders/components/order-list/order-list.component';
import { OrderShow } from '@app/modules/orders/components/order-show/order-show.component';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

export const orderResource = {
  name: 'orders',
  list: OrderList,
  show: OrderShow,
  edit: OrderEdit,
  create: OrderCreate,
  options: { label: 'Замовлення' },
  icon: ShoppingBagIcon,
};
