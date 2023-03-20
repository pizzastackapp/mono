import { HomeIcon } from '@app/assets/icons/components/home.icon';
import { theme } from '@app/core/theme';
import { HomeStack } from '@app/screens/home/home.stack';
import { SampleScreen } from '@app/screens/sample.screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { FC } from 'react';

interface RootStackProps {}

const Tab = createBottomTabNavigator();

const routes = {
  home: {
    name: 'Головна',
    component: HomeStack,
  },
  sample: {
    name: 'Sample',
    component: SampleScreen,
  },
};

export const RootStack: FC<RootStackProps> = ({}) => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color }) => {
            if (route.name === routes.home.name) {
              return <HomeIcon color={color} />;
            }

            return null;
          },
          tabBarActiveTintColor: theme.colors.amber['400'],
          tabBarInactiveTintColor: theme.colors.gray['400'],
        })}>
        <Tab.Screen name={routes.home.name} component={routes.home.component} />
        <Tab.Screen
          name={routes.sample.name}
          component={routes.sample.component}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
