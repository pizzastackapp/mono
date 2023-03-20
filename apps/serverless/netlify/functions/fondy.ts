import { Handler } from '@netlify/functions';
import crypto from 'crypto';
import { api } from '../common/api';
import { generateSignature } from '../common/fondy';
import { Payment_Status_Enum } from '../common/sdk';
import { config } from '../core/config';
import { FondyCallbackResponseDTO } from '../dto/fondy-callback-response.dto';

const keysFilter = (body: FondyCallbackResponseDTO) => (key: string) =>
  body[key] !== '' &&
  body[key] !== body.response_signature_string &&
  body[key] !== body.signature;

const handler: Handler = async (event, context) => {
  const { headers, body } = event;

  const fondyBody: FondyCallbackResponseDTO = JSON.parse(body);
  const signature = generateSignature(fondyBody, keysFilter);

  if (signature !== fondyBody.signature) {
    throw new Error('Invalid signature');
  }

  await api.UpdateOrderPaymentStatusById({
    id: fondyBody.order_id,
    payment_status:
      fondyBody.order_status === 'approved'
        ? Payment_Status_Enum.Succeeded
        : Payment_Status_Enum.Failed,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      headers,
    }),
  };
};

export { handler };
