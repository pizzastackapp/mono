import { theme } from '@app/core/theme';
import { menuImageSize } from '@app/modules/menu/utils/menu-image-size';
import { Dimensions, StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const { width: pizzaCardWidth, height: pizzaImageHeight } = menuImageSize({
  width: windowWidth,
  originalHeight: 241,
  originalWidth: 375,
});

export const menuItemModalStyles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(16, 20, 38, 0.3)',
    height: '100%',
  },
  wrapper: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: 'relative',
    marginTop: 'auto',
  },
  itemImage: {
    width: pizzaCardWidth,
    height: pizzaImageHeight,
    resizeMode: 'contain',
    borderRadius: 16,
    marginBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 14,
    right: 14,
  },
  infoWrapper: {
    paddingHorizontal: 16,
    marginBottom: 40,
  },
  mainInfoWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 6,
    width: '100%',
  },
  title: {
    fontSize: 24,
    color: theme.colors.gray[600],
    fontWeight: '600',
    marginRight: 8,
    flex: 1,
    flexWrap: 'wrap',
  },
  price: {
    fontSize: 24,
    color: theme.colors.gray[600],
    fontWeight: '600',
  },
  ingredients: {
    fontSize: 18,
    color: theme.colors.gray[400],
  },
  cartActionsWrapper: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[100],
    backgroundColor: theme.colors.white,
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  changeCartWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cartQuantity: {
    fontSize: 20,
    color: theme.colors.gray[900],
    fontWeight: '500',
    marginHorizontal: 14,
  },
});
