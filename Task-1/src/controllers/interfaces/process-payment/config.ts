import { Request } from '../../../dto/billing-api/customer/id/payments/POST';

export default interface IConfig {
  build(request: Request, customerID: string): void;
  getRequest(): Request;
  getCustomerID(): string;
}
