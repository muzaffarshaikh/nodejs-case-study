import { injectable } from 'inversify';
import { Request } from '../../dto/billing-api/customer/id/subscription-plan/POST';
import { IConfig } from '../interfaces/assign-subscription-plan';

@injectable()
export default class Config implements IConfig {
  private request!: Request;

  private customerID!: string;

  build(request: Request): void {
    this.request = request;
  }

  getCustomerID(): string {
    return this.customerID;
  }

  getRequest(): Request {
    return this.request;
  }
}
