import * as crypto from 'crypto';
import { config } from '../core/config';

export const hashPassword = (password: string): string => {
  return crypto
    .pbkdf2Sync(password, config.passwordSalt, 1000, 64, 'sha512')
    .toString('hex');
};
