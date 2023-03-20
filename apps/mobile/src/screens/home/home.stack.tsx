import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '@app/screens/home/home.screen';
import { MenuItemModal } from '@app/modules/menu/components/menu-item-modal/menu-item-modal.component';

const Stack = createStackNavigator();

export const homeStackRoutes = {
  home: {
    name: 'home',
    component: HomeScreen,
  },
  menuItemModal: {
    name: 'menuItemModal',
    component: MenuItemModal,
  },
};

export const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name={homeStackRoutes.home.name}
          component={homeStackRoutes.home.component}
        />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: 'transparentModal',
          headerShown: false,
        }}>
        <Stack.Screen
          name={homeStackRoutes.menuItemModal.name}
          component={homeStackRoutes.menuItemModal.component}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
