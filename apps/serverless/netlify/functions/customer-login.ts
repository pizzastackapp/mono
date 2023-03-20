import { Handler } from '@netlify/functions';
import twilio from 'twilio';
import { api } from '../common/api';
import { validatePhoneNumber } from '../common/phoneNumber';
import { CustomerLoginInput } from '../common/sdk';
import { verifyHasura } from '../common/verifyHasura';
import { config } from '../core/config';

const twilioClient = twilio(config.twilioAccoundSid, config.twilioAuthToken);

const handler: Handler = async (event, context) => {
  const { body, headers } = event;

  try {
    verifyHasura(headers);
  } catch (error) {
    return JSON.parse(error.message);
  }

  const input: CustomerLoginInput = JSON.parse(body).input.input;
  let phoneNumber;

  try {
    phoneNumber = validatePhoneNumber(input.phoneNumber);
  } catch (error) {
    return JSON.parse(error.message);
  }

  const verification = await twilioClient.verify.v2
    .services(config.twilioServiceSid)
    .verifications.create({ to: phoneNumber, channel: 'sms' });

  await api.RegisterNewCustomer(
    {
      phone: phoneNumber,
      twilioVerificationSid: verification.sid,
    },
    {
      'x-hasura-admin-secret': config.hasuraAdminSecret,
    }
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      status: verification.status,
    }),
  };
};

export { handler };
