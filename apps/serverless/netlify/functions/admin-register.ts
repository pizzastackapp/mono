import { Handler } from '@netlify/functions';
import { hashPassword } from '../common/password';
import { signToken } from '../common/jwt';
import { api } from '../common/api';
import { AdminRegisterInput } from '../common/sdk';
import { config } from '../core/config';
import { verifyHasura } from '../common/verifyHasura';

const handler: Handler = async (event, context) => {
  const { body, headers } = event;

  try {
    verifyHasura(headers);
  } catch (error) {
    return JSON.parse(error.message);
  }

  const input: AdminRegisterInput = JSON.parse(body!).input.admin;

  const password = hashPassword(input.password);

  const data = await api.InsertAdmin(
    {
      username: input.username,
      password,
    },
    {
      'x-hasura-admin-secret': config.hasuraAdminSecret,
    }
  );

  const accessToken = signToken(data.insert_admin_one?.id);

  return {
    statusCode: 200,
    body: JSON.stringify({ accessToken: accessToken }),
  };
};

export { handler };
