import { injectable, inject } from 'inversify';
import TYPES from '../inversify/types';
import { SubscriptionPlan } from '../models';
import { ISubscriptionPlanRepository } from './interfaces';

@injectable()
export default class SubscriptionPlanRepository
  implements ISubscriptionPlanRepository
{
  private dbURL: string;

  constructor(@inject(TYPES.DBURL) dbURL: string) {
    this.dbURL = dbURL;
  }

  // eslint-disable-next-line class-methods-use-this
  async createSubscriptionPlan(
    subscriptionPlan: SubscriptionPlan
  ): Promise<SubscriptionPlan> {
    try {
      // This method is responsible for creating a DB entry for subscription plan
      console.log('dbURL:', this.dbURL);
      return subscriptionPlan;
    } catch (error) {
      console.error(
        'SubscriptionPlanRepository.createSubscriptionPlan() Error:',
        error
      );
      throw error;
    }
  }
}
