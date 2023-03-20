import {
  ApolloClient,
  ApolloLink,
  concat,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { HASURA_URL, NODE_ENV } from '@env';
import { Platform } from 'react-native';

const httpLink = new HttpLink({
  uri:
    Platform.OS === 'ios' && NODE_ENV === 'development'
      ? 'http://192.168.0.29:8080/v1/graphql'
      : HASURA_URL,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});
