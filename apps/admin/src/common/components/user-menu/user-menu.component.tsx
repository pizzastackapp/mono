import { FC } from 'react';
import {
  Logout,
  MenuItemLink,
  UserMenu as UserMenuOriginal,
  UserMenuProps,
} from 'react-admin';
import SettingsIcon from '@mui/icons-material/Settings';

export const UserMenu: FC<UserMenuProps> = (props) => {
  return (
    <UserMenuOriginal {...props}>
      <MenuItemLink
        to="/settings"
        primaryText="Налаштування"
        leftIcon={<SettingsIcon />}
      />
      <Logout />
    </UserMenuOriginal>
  );
};
