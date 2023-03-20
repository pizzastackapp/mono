import { theme } from '@app/core/theme';
import { StyleSheet } from 'react-native';

export const roundButtonStyles = StyleSheet.create({
  button: {
    width: 25,
    height: 25,
    backgroundColor: theme.colors.slate[200],
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeButton: {
    width: 40,
    height: 40,
  },
});
