import { Handler } from '@netlify/functions';
import { config } from '../core/config';

const handler: Handler = async (event, context) => {
  const { queryStringParameters } = event;

  const { url } = queryStringParameters;

  return {
    statusCode: 302,
    headers: {
      Location: url || config.clientFrontendUrl,
    },
  };
};

export { handler };
