import { GraphQLClient } from 'graphql-request';
import { config } from '../core/config';
import { getSdk } from './sdk';

export const api = getSdk(
  new GraphQLClient(config.hasuraEndpoint, {
    headers: {
      'x-hasura-admin-secret': config.hasuraAdminSecret,
    },
  })
);
