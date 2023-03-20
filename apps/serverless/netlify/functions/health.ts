import { Handler } from '@netlify/functions';
const handler: Handler = async (event, context) => {
  const { headers } = event;

  return {
    statusCode: 200,
    body: JSON.stringify({
      headers,
    }),
  };
};

export { handler };
