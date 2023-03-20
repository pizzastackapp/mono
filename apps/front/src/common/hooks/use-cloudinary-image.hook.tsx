import { cloudinary } from '@app/core/cloudinary';
import { CloudinaryImage } from '@cloudinary/url-gen/assets/CloudinaryImage';

export const useCloudinaryImage = (
  cloudinaryImage: string,
  transformations: string[]
): CloudinaryImage => {
  const image = cloudinary.image(cloudinaryImage);

  const transforms = [...transformations, 'dpr_2.0'];

  image.addTransformation(transforms.join(','));

  return image;
};
