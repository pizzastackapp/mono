import { CustomerList } from '@app/modules/customers/components/customer-list/customer-list.component';
import { CustomerShow } from '@app/modules/customers/components/customer-show/customer-show.component';
import PersonIcon from '@mui/icons-material/Person';

export const customerResource = {
  name: 'customers',
  list: CustomerList,
  show: CustomerShow,
  options: { label: 'Користувачі' },
  icon: PersonIcon,
};
