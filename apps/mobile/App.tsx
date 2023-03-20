import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@app/core/apollo-client';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import { RootStack } from '@app/screens/root-stack';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <StatusBar barStyle="dark-content" />
      <RootStack />
      <Toast />
    </ApolloProvider>
  );
};

export default App;
