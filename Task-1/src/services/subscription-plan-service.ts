import { inject, injectable } from 'inversify';
import { SubscriptionPlan } from '../models';
import TYPES from '../inversify/types';
import { ISubscriptionPlanRepository } from '../repositories/interfaces';
import { ISubscriptionPlanService } from './interfaces';

@injectable()
export default class SubscriptionPlanService implements ISubscriptionPlanService {
  private subscriptionPlanRepository!: ISubscriptionPlanRepository;

  constructor(@inject(TYPES.SubscriptionPlanRepository) bookRepository: ISubscriptionPlanRepository) {
    this.subscriptionPlanRepository = this.subscriptionPlanRepository;
  }

  async createSubscriptionPlan(subscriptionPlan: SubscriptionPlan): Promise<SubscriptionPlan> {
    try {
      return this.subscriptionPlanRepository.createSubscriptionPlan(subscriptionPlan);
    } catch (error) {
      console.error('SubscriptionPlanService.createSubscriptionPlan() Error:', error);
      throw error;
    }
  }
}
