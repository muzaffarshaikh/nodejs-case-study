import { Container } from 'inversify';
import {
  IConfig as ICreateSubscriptionPlanConfig,
  IController as ICreateSubscriptionPlanController,
  IResult as ICreateSubscriptionPlanResult,
} from '../controllers/interfaces/create-subscription-plan';
import {
  Config as CreateSubscriptionPlanConfig,
  Controller as CreateSubscriptionPlanController,
  Result as CreateSubscriptionPlanResult,
} from '../controllers/create-subscription-plan';
import { ISubscriptionPlanService } from '../services/interfaces';
import { SubscriptionPlanService } from '../services';
import { ISubscriptionPlanRepository } from '../repositories/interfaces';
import { SubscriptionPlanRepository } from '../repositories';
import TYPES from './types';
import getDataMapper from './database';

const container = new Container();

container.bind(TYPES.DynamodbDataMapper).toDynamicValue(getDataMapper);
container
  .bind<ICreateSubscriptionPlanController>(
    TYPES.CreateSubscriptionPlanController
  )
  .to(CreateSubscriptionPlanController);

container
  .bind<ICreateSubscriptionPlanConfig>(TYPES.CreateSubscriptionPlanConfig)
  .to(CreateSubscriptionPlanConfig);

container
  .bind<ICreateSubscriptionPlanResult>(TYPES.CreateSubscriptionPlanResult)
  .to(CreateSubscriptionPlanResult);

container
  .bind<ISubscriptionPlanService>(TYPES.SubscriptionPlanService)
  .to(SubscriptionPlanService);

container
  .bind<ISubscriptionPlanRepository>(TYPES.SubscriptionPlanRepository)
  .to(SubscriptionPlanRepository);

export default container;
