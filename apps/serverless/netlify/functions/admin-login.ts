import { Handler } from '@netlify/functions';
import { AdminLoginInput } from '../common/sdk';
import { api } from '../common/api';
import { hashPassword } from '../common/password';
import { signToken } from '../common/jwt';
import { config } from '../core/config';

const invalidUserOrPassword = {
  statusCode: 404,
  body: JSON.stringify({ message: 'User not found or password invalid' }),
};

const handler: Handler = async (event, context) => {
  const { body } = event;
  const input: AdminLoginInput = JSON.parse(body!).input.admin;

  const data = await api.GetAdminByUsername(
    { username: input.username },
    {
      'x-hasura-admin-secret': config.hasuraAdminSecret,
    }
  );

  if (data.admin.length === 0) {
    return invalidUserOrPassword;
  }

  const hashedPassword = hashPassword(input.password);

  if (hashedPassword !== data.admin[0].password) {
    return invalidUserOrPassword;
  }

  const accessToken = signToken(data.admin[0].id);

  return {
    statusCode: 200,
    body: JSON.stringify({ accessToken }),
  };
};

export { handler };
