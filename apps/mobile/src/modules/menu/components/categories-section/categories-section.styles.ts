import { theme } from '@app/core/theme';
import { StyleSheet } from 'react-native';

export const categoriesSectionStyles = StyleSheet.create({
  categoriesTitle: {
    color: theme.colors.gray[900],
    fontSize: 16,
    fontFamily: theme.fonts.roboto.medium,
    marginBottom: 16,
  },
  categoriesBtnsContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 32,
  },
  categoryBtn: {
    marginRight: 4,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: theme.colors.slate[100],
    borderRadius: 20,
  },
  categoryBtnText: {
    fontSize: 14,
    color: theme.colors.gray[900],
    fontFamily: theme.fonts.roboto.medium,
  },
});
