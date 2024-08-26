import 'reflect-metadata';
import { mock } from 'jest-mock-extended';
import { ISubscriptionPlanRepository } from '../../../src/repositories/interfaces';
import { SubscriptionPlanService } from '../../../src/services';
import { SubscriptionPlan } from '../../../src/models';

describe('subscription-plan-service', () => {
  const subscriptionPlanRepository = mock<ISubscriptionPlanRepository>();
  const subscriptionPlanService = new SubscriptionPlanService(
    subscriptionPlanRepository
  );

  describe('createSubscriptionPlan()', () => {
    beforeEach(() => {
      subscriptionPlanRepository.createSubscriptionPlan.mockResolvedValue(
        new SubscriptionPlan()
      );
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should make a call to subscription plan repository createSubscriptionPlan method', async () => {
      const result = await subscriptionPlanService.createSubscriptionPlan(
        new SubscriptionPlan()
      );

      expect(result).toBeInstanceOf(SubscriptionPlan);
    });

    it('should throw an error when an exception occurs', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error');

      subscriptionPlanRepository.createSubscriptionPlan.mockImplementation(
        () => {
          throw new Error('exception');
        }
      );

      await expect(async () => {
        return subscriptionPlanService.createSubscriptionPlan(
          new SubscriptionPlan()
        );
      }).rejects.toThrow('exception');

      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });
});
