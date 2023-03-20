import { Handler } from '@netlify/functions';
import { v2 as cloudinary } from 'cloudinary';
import { getAdminFromHeaders } from '../common/getAdminFromHeaders';
import { GetAdminByIdQuery } from '../common/sdk';
import { config } from '../core/config';

cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret,
  secure: true,
});

const handler: Handler = async (event, context) => {
  const { headers } = event;

  let admin: GetAdminByIdQuery;
  try {
    admin = await getAdminFromHeaders(headers);
  } catch (error) {
    return JSON.parse(error.message);
  }

  if (!admin.admin_by_pk?.id) {
    return {
      statusCode: 403,
      body: JSON.stringify({ message: 'Forbidden' }),
    };
  }

  const timestamp = Math.round(new Date().getTime() / 1000);
  const publicId = `menu-${timestamp}`;

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder: 'menu',
      public_id: publicId,
    },
    process.env.API_SECRET!
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      apiKey: process.env.API_KEY,
      cloudName: process.env.CLOUD_NAME,
      signature,
      timestamp,
      publicId,
    }),
  };
};

export { handler };
