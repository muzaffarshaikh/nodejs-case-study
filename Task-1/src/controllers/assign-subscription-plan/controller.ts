import { inject, injectable } from 'inversify';
import { JsonSerializer } from 'typescript-json-serializer';
import { v4 as UUIDv4 } from 'uuid';
import * as moment from 'moment-timezone';
import {
  IController as IAssignSubscriptionPlanController,
  IConfig as IAssignSubscriptionPlanConfig,
  IResult as IAssignSubscriptionPlanResult,
} from '../../controllers/interfaces/assign-subscription-plan';
import {
  ISubscriptionPlanService,
  ICustomerService,
  ISubscriptionService,
} from '../../services/interfaces';
import { Response } from '../../dto/billing-api/customer/id/subscription-plan/POST';
import TYPES from '../../inversify/types';
import CustomError from '../../utils/custom-error';
import { Subscription } from '../../models';
import { SubscriptionStatus } from '../../models/subscription';

enum ErrorCodes {
  FORBIDDEN_ERROR = 'error.billing-api.assign-subscription-plan.forbidden',
}

@injectable()
export default class Controller implements IAssignSubscriptionPlanController {
  private result!: IAssignSubscriptionPlanResult;

  private subscriptionPlanService!: ISubscriptionPlanService;

  private subscriptionService!: ISubscriptionService;

  private customerService!: ICustomerService;

  constructor(
    @inject(TYPES.AssignSubscriptionPlanResult)
    result: IAssignSubscriptionPlanResult,
    @inject(TYPES.SubscriptionPlanService)
    subscriptionPlanService: ISubscriptionPlanService,
    @inject(TYPES.SubscriptionPlanService)
    subscriptionService: ISubscriptionService,
    @inject(TYPES.CustomerService)
    customerService: ICustomerService
  ) {
    this.result = result;
    this.subscriptionPlanService = subscriptionPlanService;
    this.customerService = customerService;
    this.subscriptionService = subscriptionService;
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
      const currentPlan = customer.getCurrentSubscriptionPlan();
      if (currentPlan) {
        customer.setPreviousSubscriptionPlan(currentPlan);
      }
      customer.setCurrentSubscriptionPlan(subscriptionPlan);

      // In scenarios where a subscription needs to be started in future, we should not take current date as subscription start date.
      const currentDate = moment.utc();
      const subscription = new Subscription();
      subscription.build(
        UUIDv4(),
        customer.getID(),
        subscriptionPlan.getID(),
        currentDate.toISOString(),
        currentDate
          .clone()
          .add(subscriptionPlan.getPricing().getBillingCycle(), 'days')
          .toISOString(),
        SubscriptionStatus.ACTIVE,
        currentDate.toISOString()
      );

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
