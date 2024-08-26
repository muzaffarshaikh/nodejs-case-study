import { Subscription } from '../../models';

export default interface ISubscriptionService {
  createSubscription(subscription: Subscription): Promise<Subscription>;
  getSubscriptionsByCustomerID(
    customerID: string
  ): Promise<Array<Subscription>>;
}
