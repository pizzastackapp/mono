import { Menu } from '@app/core/types';
import { Typography } from '@mui/material';
import { useRecordContext } from 'react-admin';

export const MenuListExpand = () => {
  const menuItem = useRecordContext<Menu>();

  return (
    <div style={{ display: 'flex', gap: 64 }}>
      <div>
        <Typography variant="subtitle2">Інгридієнти</Typography>
        <Typography variant="body2">{menuItem.ingredients}</Typography>
      </div>
      <div>
        <Typography variant="subtitle2">Вага</Typography>
        <Typography variant="body2">{menuItem.weight} гр.</Typography>
      </div>
    </div>
  );
};
