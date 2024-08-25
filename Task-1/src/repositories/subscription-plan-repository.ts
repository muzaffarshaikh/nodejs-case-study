import { injectable, inject } from 'inversify';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import TYPES from '../inversify/types';
import { SubscriptionPlan } from '../models';
import { ISubscriptionPlanRepository } from './interfaces';

@injectable()
export default class SubscriptionPlanRepository
  implements ISubscriptionPlanRepository
{
  private dataMapper: DataMapper;

  constructor(@inject(TYPES.DynamodbDataMapper) dataMapper: DataMapper) {
    this.dataMapper = dataMapper;
  }

  // eslint-disable-next-line class-methods-use-this
  async createSubscriptionPlan(
    subscriptionPlan: SubscriptionPlan
  ): Promise<SubscriptionPlan> {
    try {
      return await this.dataMapper.put(subscriptionPlan);
    } catch (error) {
      console.error(
        'SubscriptionPlanRepository.createSubscriptionPlan() Error:',
        error
      );
      throw error;
    }
  }

  async getSubscriptionPlanByID(
    subscriptionPlanID: string
  ): Promise<SubscriptionPlan> {
    try {
      const subscriptionPlan = new SubscriptionPlan();
      subscriptionPlan.setID(subscriptionPlanID);
      return await this.dataMapper.get(subscriptionPlan);
    } catch (error) {
      console.error(
        'SubscriptionPlanRepository.getSubscriptionPlanByID() Error:',
        error
      );
      throw error;
    }
  }
}
