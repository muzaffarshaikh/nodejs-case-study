import { injectable } from 'inversify';
import { IConfig } from '../interfaces/get-customer-invoices';

@injectable()
export default class Config implements IConfig {
  private customerID!: string;

  build(customerID: string): void {
    this.customerID = customerID;
  }

  getCustomerID(): string {
    return this.customerID;
  }
}
