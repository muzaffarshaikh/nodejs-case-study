import { inject, injectable } from 'inversify';
import { JsonSerializer } from 'typescript-json-serializer';
import { v4 as UUIDv4 } from 'uuid';
import {
  IController as ICreateSubscriptionPlanController,
  IConfig as ICreateSubscriptionPlanConfig,
  IResult as ICreateSubscriptionPlanResult,
} from '../../controllers/interfaces/create-subscription-plan';
import { ISubscriptionPlanService } from '../../services/interfaces';
import { SubscriptionPlan } from '../../models';
import { Response } from '../../dto/billing-api/subscription-plans/POST';
import TYPES from '../../inversify/types';
import CustomError from '../../utils/custom-error';
import { SubscriptionStatus } from '../../models/subscription-plan';

enum ErrorCodes {
  FORBIDDEN_ERROR = 'error.billing-api.create-subscription-plan.forbidden',
}

@injectable()
export default class Controller implements ICreateSubscriptionPlanController {
  private result!: ICreateSubscriptionPlanResult;

  private subscriptionPlanService!: ISubscriptionPlanService;

  constructor(
    @inject(TYPES.CreateSubscriptionPlanResult)
    result: ICreateSubscriptionPlanResult,
    @inject(TYPES.SubscriptionPlanService)
    subscriptionPlanService: ISubscriptionPlanService
  ) {
    this.result = result;
    this.subscriptionPlanService = subscriptionPlanService;
  }

  async process(
    config: ICreateSubscriptionPlanConfig
  ): Promise<ICreateSubscriptionPlanResult> {
    try {
      const request = config.getRequest();
      const validationResult = request.validate();
      if (validationResult.error) {
        console.log('Validation Error');
        throw new CustomError(
          ErrorCodes.FORBIDDEN_ERROR,
          `Validation of request failed with message: ${validationResult.error.message}`
        );
      }
      const jsonSerializer = new JsonSerializer();
      const subscriptionPlan = jsonSerializer.deserializeObject(
        request,
        SubscriptionPlan
      ) as SubscriptionPlan;
      subscriptionPlan.setID(UUIDv4());
      // Marking plan status as inactive initially when creating. Incase the plan need not go live as soon as adding it.
      // A new API to update subscription status needs to be implemented.
      subscriptionPlan.setStatus(SubscriptionStatus.INACTIVE);

      const createSubscriptionPlanResponse =
        await this.subscriptionPlanService.createSubscriptionPlan(
          subscriptionPlan
        );

      const response = jsonSerializer.deserializeObject(
        createSubscriptionPlanResponse,
        Response
      ) as Response;

      this.result.build(response);
    } catch (error) {
      console.error('CreateSubscriptionPlanController.process() Error:', error);
      throw error;
    }
    return this.result;
  }
}
