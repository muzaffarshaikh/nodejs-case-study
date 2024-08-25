import { SubscriptionPlan } from '../../models';

export default interface ISubscriptionPlanService {
  createSubscriptionPlan(
    subscriptionPlan: SubscriptionPlan
  ): Promise<SubscriptionPlan>;
  getSubscriptionPlanByID(id: string): Promise<SubscriptionPlan>;
}
