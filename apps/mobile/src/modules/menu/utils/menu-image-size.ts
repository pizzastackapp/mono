import { Dimensions } from 'react-native';

interface MenuImageSizeOptions {
  width?: number;
  originalHeight?: number;
  originalWidth?: number;
}

export const menuImageSize = (
  { width, originalHeight, originalWidth }: MenuImageSizeOptions = {
    originalHeight: 105,
    originalWidth: 163,
  },
) => {
  const windowWidth = Dimensions.get('window').width;

  const pizzaCardWidth = width ?? windowWidth / 2 - 24;
  const pizzaImageHeight = (originalHeight! / originalWidth!) * pizzaCardWidth;

  return {
    width: pizzaCardWidth,
    height: pizzaImageHeight,
  };
};
