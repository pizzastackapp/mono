import { Orders, Order_Status_Enum } from '@app/core/types';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FC, MouseEvent } from 'react';
import {
  useGetList,
  useListContext,
  useNotify,
  useRecordContext,
  useUpdate,
} from 'react-admin';

interface InlineStatusEditProps {
  label?: string;
}

export const InlineStatusEdit: FC<InlineStatusEditProps> = ({ label }) => {
  const record = useRecordContext<Orders>();
  const orderStatuses = useGetList('order_status');
  const notify = useNotify();

  const stopPropagation = (event: MouseEvent<HTMLLIElement, MouseEvent>) => {
    event.stopPropagation();
  };

  const { resource } = useListContext();
  const [changeStatus] = useUpdate();
  const handleChange = async (event: SelectChangeEvent<Order_Status_Enum>) => {
    try {
      await changeStatus(
        resource,
        {
          id: record.id,
          data: { status: event.target.value },
          previousData: record,
        },
        {
          mutationMode: 'pessimistic',
        }
      );

      notify('Статус замовлення змінено!', { type: 'success' });
    } catch (error) {
      console.log(error);
      notify('Щось пішло не так 🥲', { type: 'error' });
    }
  };

  return (
    <Select
      value={record.status}
      label={label}
      onChange={handleChange}
      fullWidth
      variant="standard"
    >
      {orderStatuses.data?.map((orderStatus) => (
        // We need onClick, but ButtonBase type doesn't have onClick type
        // @ts-ignore
        <MenuItem value={orderStatus.id} onClick={stopPropagation}>
          {orderStatus.label}
        </MenuItem>
      ))}
    </Select>
  );
};
