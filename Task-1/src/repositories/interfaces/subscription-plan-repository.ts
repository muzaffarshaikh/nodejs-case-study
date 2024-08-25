import { SubscriptionPlan } from '../../models';

export default interface ISubscriptionPlanRepository {
  createSubscriptionPlan(
    subscriptionPlan: SubscriptionPlan
  ): Promise<SubscriptionPlan>;
  getSubscriptionPlanByID(id: string): Promise<SubscriptionPlan>;
}
