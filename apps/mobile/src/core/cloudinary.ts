import { Cloudinary } from '@cloudinary/url-gen';
import { CLOUDINARY_CLOUD_NAME } from '@env';

export const cloudinary = new Cloudinary({
  cloud: {
    cloudName: CLOUDINARY_CLOUD_NAME,
  },
});
