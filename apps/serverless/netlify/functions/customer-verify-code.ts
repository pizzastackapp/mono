import { Handler } from '@netlify/functions';
import twilio from 'twilio';
import { api } from '../common/api';
import { signToken } from '../common/jwt';
import { validatePhoneNumber } from '../common/phoneNumber';
import { CustomerVerifyCodeInput } from '../common/sdk';
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

  const input: CustomerVerifyCodeInput = JSON.parse(body).input.input;
  let phoneNumber;

  try {
    phoneNumber = validatePhoneNumber(input.phoneNumber);
  } catch (error) {
    return JSON.parse(error.message);
  }

  const customer = await api.GetCustomerByPhone(
    { phoneNumber },
    {
      'x-hasura-admin-secret': config.hasuraAdminSecret,
    }
  );

  await twilioClient.verify.v2
    .services(config.twilioServiceSid)
    .verificationChecks.create({
      to: phoneNumber,
      code: input.code,
      verificationSid: customer.customers[0].twilioVerificationSid,
    });

  const accessToken = signToken(customer.customers[0].id, 'user');

  return {
    statusCode: 200,
    body: JSON.stringify({
      accessToken,
    }),
  };
};

export { handler };
