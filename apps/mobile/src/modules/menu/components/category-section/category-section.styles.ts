import { theme } from '@app/core/theme';
import { StyleSheet } from 'react-native';

export const categorySectionStyles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
  },
  categoryTitle: {
    fontSize: 14,
    color: theme.colors.gray[900],
    fontFamily: theme.fonts.roboto.medium,
    marginBottom: 16,
  },
  pizzaCardWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
