import { phoneRegexp } from './regex';

export const validatePhoneNumber = (phoneNumber: string) => {
  let transformedPhoneNumber = phoneNumber;
  const isPhoneValid = phoneRegexp.test(phoneNumber);

  if (!isPhoneValid) {
    throw new Error(
      JSON.stringify({
        statusCode: 400,
        body: JSON.stringify({ message: 'Phone is invalid' }),
      })
    );
  }

  if (!phoneNumber.startsWith('+')) {
    if (phoneNumber.startsWith('38')) {
      transformedPhoneNumber = `+${phoneNumber}`;
    } else {
      transformedPhoneNumber = `+38${phoneNumber}`;
    }
  }

  return transformedPhoneNumber;
};
