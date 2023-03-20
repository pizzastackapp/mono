import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { config } from '@app/core/config';
import { JWT_ADMIN_TOKEN } from '@app/core/constants';

const httpLink = createHttpLink({ uri: config.hasuraEndpoint });

const authLink = setContext((_, config) => {
  const token = localStorage.getItem(JWT_ADMIN_TOKEN);

  if (!token) {
    return config;
  }

  return {
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
