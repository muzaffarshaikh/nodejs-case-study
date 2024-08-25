import { inject, injectable } from 'inversify';
import { JsonSerializer } from 'typescript-json-serializer';
import {
  IController as IAssignSubscriptionPlanController,
  IConfig as IAssignSubscriptionPlanConfig,
  IResult as IAssignSubscriptionPlanResult,
} from '../../controllers/interfaces/assign-subscription-plan';
import {
  ISubscriptionPlanService,
  ICustomerService,
} from '../../services/interfaces';
import { Response } from '../../dto/billing-api/customer/id/subscription-plan/POST';
import TYPES from '../../inversify/types';
import CustomError from '../../utils/custom-error';

enum ErrorCodes {
  FORBIDDEN_ERROR = 'error.billing-api.assign-subscription-plan.forbidden',
}

@injectable()
export default class Controller implements IAssignSubscriptionPlanController {
  private result!: IAssignSubscriptionPlanResult;

  private subscriptionPlanService!: ISubscriptionPlanService;

  private customerService!: ICustomerService;

  constructor(
    @inject(TYPES.AssignSubscriptionPlanResult)
    result: IAssignSubscriptionPlanResult,
    @inject(TYPES.SubscriptionPlanService)
    subscriptionPlanService: ISubscriptionPlanService,
    @inject(TYPES.CustomerService)
    customerService: ICustomerService
  ) {
    this.result = result;
    this.subscriptionPlanService = subscriptionPlanService;
    this.customerService = customerService;
  }

  async process(
    config: IAssignSubscriptionPlanConfig
  ): Promise<IAssignSubscriptionPlanResult> {
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
      /* TODO: subscriptionPlanID needs to be refactored later to consider subscriptionPlan name, 
      Since end user won't have access to UUID. */
      const subscriptionPlan =
        await this.subscriptionPlanService.getSubscriptionPlanByID(
          request.getSubscriptionPlanID()
        );
      const customer = await this.customerService.getCustomerByID(
        config.getCustomerID()
      );
      customer.setSubscriptionPlan(subscriptionPlan);

      /* TODO: This is a provisional change and the setting of status should be handled as part of a 
      separate microservice (API). Since, we should be able to make customer subscription active/inactive at any given time.*/
      customer.activateSubscription();
      const updatedCustomer = this.customerService.updateCustomer(customer);

      const response = jsonSerializer.deserializeObject(
        updatedCustomer,
        Response
      ) as Response;

      this.result.build(response);
    } catch (error) {
      console.error('AssignSubscriptionPlanController.process() Error:', error);
      throw error;
    }
    return this.result;
  }
}
