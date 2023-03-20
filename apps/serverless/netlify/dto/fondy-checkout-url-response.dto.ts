export interface FondyCheckoutUrlResponse {
  response: Response;
}

interface Response {
  checkout_url: string;
  payment_id: string;
  response_status: string;
  error_code?: number;
  error_message?: string;
}
