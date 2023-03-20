import { UserMenu } from '@app/common/components/user-menu/user-menu.component';
import { FC } from 'react';
import { AppBar as AppBarOriginal, AppBarProps } from 'react-admin';

export const AppBar: FC<AppBarProps> = (props) => {
  return <AppBarOriginal {...props} userMenu={<UserMenu />} />;
};
