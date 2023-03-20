export const config = {
  // HASURA
  hasuraEndpoint: process.env.HASURA_ENDPOINT,
  hasuraAdminSecret: process.env.HASURA_ADMIN_SECRET,
  hasuraPizzastackSecret: process.env.HASURA_PIZZASTACK_SECRET,
  // CLOUDINARY
  cloudinaryCloudName: process.env.CLOUD_NAME,
  cloudinaryApiKey: process.env.API_KEY,
  cloudinaryApiSecret: process.env.API_SECRET,
  // TWILIO
  twilioAccoundSid: process.env.TWILIO_ACCOUNT_SID,
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
  twilioServiceSid: process.env.TWILIO_SERVICE_SID,
  // ONESIGNAL
  onesignalApiKey: process.env.ONESIGNAL_API_KEY,
  onesignalAppId: process.env.ONESIGNAL_APP_ID,
  // FONDY
  fondyMerchantId: process.env.FONDY_MERCHANT_ID,
  fondyMerchantPassword: process.env.FONDY_MERCHANT_PASSWORD,
  // URL
  serverlessUrl: process.env.SERVERLESS_URL,
  adminFrontendUrl: process.env.ADMIN_FRONTEND_URL,
  clientFrontendUrl: process.env.CLIENT_FRONTEND_URL,
  // MISC
  jwtSecret: process.env.JWT_SECRET,
  passwordSalt: process.env.PASSWORD_SALT,
};
