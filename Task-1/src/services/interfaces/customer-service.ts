import { Customer } from '../../models';

export default interface ISubscriptionPlanService {
  // TODO: Implement createCustomer() if time permits.
  updateCustomer(customer: Customer): Promise<Customer>;
  getCustomerByID(id: string): Promise<Customer>;
  getAllCustomers(): Promise<Array<Customer>>;
}
