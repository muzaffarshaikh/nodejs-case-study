import { inject, injectable } from 'inversify';
import { Subscription } from '../models';
import TYPES from '../inversify/types';
import { ISubscriptionRepository } from '../repositories/interfaces';
import { ISubscriptionService } from './interfaces';

@injectable()
export default class SubscriptionService implements ISubscriptionService {
  private subscriptionRepository!: ISubscriptionRepository;

  constructor(
    @inject(TYPES.SubscriptionRepository)
    subscriptionRepository: ISubscriptionRepository
  ) {
    this.subscriptionRepository = subscriptionRepository;
  }

  async createSubscription(subscription: Subscription): Promise<Subscription> {
    try {
      return await this.subscriptionRepository.createSubscription(subscription);
    } catch (error) {
      console.error('SubscriptionService.createSubscription() Error:', error);
      throw error;
    }
  }

  async getSubscriptionsByCustomerID(
    customerID: string
  ): Promise<Array<Subscription>> {
    try {
      return await this.subscriptionRepository.getSubscriptionsByCustomerID(
        customerID
      );
    } catch (error) {
      console.error(
        'SubscriptionService.getSubscriptionsByCustomerID() Error:',
        error
      );
      throw error;
    }
  }
}
