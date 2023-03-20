import { config } from '../core/config';

export const verifyHasura = (headers) => {
  if (
    !headers['x-pizzastack-secret-key'] ||
    headers['x-pizzastack-secret-key'] !== config.hasuraPizzastackSecret
  ) {
    throw new Error(
      JSON.stringify({
        statusCode: 403,
        body: JSON.stringify({
          message: "'x-pizzastack-secret-key' is missing or value is invalid",
        }),
      })
    );
  }
};
