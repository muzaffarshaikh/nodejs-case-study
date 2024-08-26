import { injectable, inject } from 'inversify';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import TYPES from '../inversify/types';
import { Subscription } from '../models';
import { ISubscriptionRepository } from './interfaces';

@injectable()
export default class SubscriptionRepository implements ISubscriptionRepository {
  private dataMapper: DataMapper;

  constructor(@inject(TYPES.DynamodbDataMapper) dataMapper: DataMapper) {
    this.dataMapper = dataMapper;
  }

  async createSubscription(subscription: Subscription): Promise<Subscription> {
    try {
      return await this.dataMapper.put(subscription);
    } catch (error) {
      console.error(
        'SubscriptionRepository.createSubscription() Error:',
        error
      );
      throw error;
    }
  }

  async getSubscriptionsByCustomerID(
    customerID: string
  ): Promise<Array<Subscription>> {
    try {
      const subscriptions = [];

      // This loop here is invalid and provisional. To fetch subscriptions by customerID, a GSI needs to be implemented.
      for await (const subscription of this.dataMapper.scan(Subscription)) {
        subscriptions.push(subscription);
      }

      return subscriptions;
    } catch (error) {
      console.error(
        'SubscriptionRepository.getSubscriptionByID() Error:',
        error
      );
      throw error;
    }
  }
}
