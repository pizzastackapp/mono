import crypto from 'crypto';
import { config } from '../core/config';

export const generateSignature = (
  body: any,
  keysFilter?: (body: any) => (key: string) => boolean
): string => {
  let orderedKeys = Object.keys(body).sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  if (keysFilter) {
    orderedKeys = orderedKeys.filter(keysFilter(body));
  }

  const signatureRaw = orderedKeys.map((v) => body[v]).join('|');
  const signature = crypto.createHash('sha1');
  signature.update(`${config.fondyMerchantPassword}|${signatureRaw}`);

  return signature.digest('hex');
};
