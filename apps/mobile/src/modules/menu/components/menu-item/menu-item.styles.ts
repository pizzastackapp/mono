import { theme } from '@app/core/theme';
import { menuImageSize } from '@app/modules/menu/utils/menu-image-size';
import { StyleSheet } from 'react-native';

const { width: pizzaCardWidth, height: pizzaImageHeight } = menuImageSize();

export const menuItemStyles = StyleSheet.create({
  pizzaCard: {
    width: pizzaCardWidth,
    marginBottom: 16,
  },
  pizzaCardImage: {
    width: pizzaCardWidth,
    height: pizzaImageHeight,
    resizeMode: 'contain',
    borderRadius: 8,
    marginBottom: 6,
  },
  pizzaCardTitle: {
    color: theme.colors.gray[900],
    fontSize: 14,
    fontFamily: theme.fonts.roboto.medium,
    marginBottom: 4,
  },
  pizzaCardPriceWrapper: {
    backgroundColor: theme.colors.amber[400],
    alignSelf: 'baseline',
    borderRadius: 10,
  },
  pizzaCardPriceTag: {
    color: theme.colors.white,
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontSize: 12,
  },
});
