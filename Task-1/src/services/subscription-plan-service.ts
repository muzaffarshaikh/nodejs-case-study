import { inject, injectable } from 'inversify';
import { SubscriptionPlan } from '../models';
import TYPES from '../inversify/types';
import { ISubscriptionPlanRepository } from '../repositories/interfaces';
import { ISubscriptionPlanService } from './interfaces';

@injectable()
export default class SubscriptionPlanService
  implements ISubscriptionPlanService
{
  private subscriptionPlanRepository!: ISubscriptionPlanRepository;

  constructor(
    @inject(TYPES.SubscriptionPlanRepository)
    subscriptionPlanRepository: ISubscriptionPlanRepository
  ) {
    this.subscriptionPlanRepository = this.subscriptionPlanRepository;
  }

  async createSubscriptionPlan(
    subscriptionPlan: SubscriptionPlan
  ): Promise<SubscriptionPlan> {
    try {
      return await this.subscriptionPlanRepository.createSubscriptionPlan(
        subscriptionPlan
      );
    } catch (error) {
      console.error(
        'SubscriptionPlanService.createSubscriptionPlan() Error:',
        error
      );
      throw error;
    }
  }

  async getSubscriptionPlanByID(
    subscriptionPlanID: string
  ): Promise<SubscriptionPlan> {
    try {
      return await this.subscriptionPlanRepository.getSubscriptionPlanByID(
        subscriptionPlanID
      );
    } catch (error) {
      console.error(
        'SubscriptionPlanService.getSubscriptionPlanByID() Error:',
        error
      );
      throw error;
    }
  }
}
