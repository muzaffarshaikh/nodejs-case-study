import { Container } from 'inversify';
import {
  IConfig as IAssignSubscriptionPlanConfig,
  IController as IAssignSubscriptionPlanController,
  IResult as IAssignSubscriptionPlanResult,
} from '../controllers/interfaces/assign-subscription-plan';
import {
  Config as AssignSubscriptionPlanConfig,
  Controller as AssignSubscriptionPlanController,
  Result as AssignSubscriptionPlanResult,
} from '../controllers/assign-subscription-plan';
import {
  ISubscriptionPlanService,
  ICustomerService,
} from '../services/interfaces';
import { SubscriptionPlanService, CustomerService } from '../services';
import {
  ISubscriptionPlanRepository,
  ICustomerRepository,
} from '../repositories/interfaces';
import {
  SubscriptionPlanRepository,
  CustomerRepository,
} from '../repositories';
import TYPES from './types';
import getDataMapper from './database';

const container = new Container();

container.bind(TYPES.DynamodbDataMapper).toDynamicValue(getDataMapper);
container
  .bind<IAssignSubscriptionPlanController>(
    TYPES.AssignSubscriptionPlanController
  )
  .to(AssignSubscriptionPlanController);

container
  .bind<IAssignSubscriptionPlanConfig>(TYPES.AssignSubscriptionPlanConfig)
  .to(AssignSubscriptionPlanConfig);

container
  .bind<IAssignSubscriptionPlanResult>(TYPES.AssignSubscriptionPlanResult)
  .to(AssignSubscriptionPlanResult);

container
  .bind<ISubscriptionPlanService>(TYPES.SubscriptionPlanService)
  .to(SubscriptionPlanService);

container
  .bind<ISubscriptionPlanRepository>(TYPES.SubscriptionPlanRepository)
  .to(SubscriptionPlanRepository);

container.bind<ICustomerService>(TYPES.CustomerService).to(CustomerService);

container
  .bind<ICustomerRepository>(TYPES.CustomerRepository)
  .to(CustomerRepository);

export default container;
