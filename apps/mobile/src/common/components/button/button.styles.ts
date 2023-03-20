import { theme } from '@app/core/theme';
import { StyleSheet } from 'react-native';

export const buttonStyles = StyleSheet.create({
  buttonView: {
    backgroundColor: theme.colors.gray[900],
    paddingHorizontal: 36,
    paddingVertical: 14,
    borderRadius: 12,
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
  },
});
