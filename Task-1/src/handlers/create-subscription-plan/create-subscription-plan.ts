import { APIGatewayProxyHandler } from 'aws-lambda';
// import * as HttpStatus from 'http-status';
import { JsonSerializer } from 'typescript-json-serializer';
import { buildApiGatewayCreatedResponse } from 'aws-lambda-response-builder';
import {
  IConfig as ICreateSubscriptionPlanControllerConfig,
  IController as ICreateSubscriptionPlanController,
} from '../../controllers/interfaces/create-subscription-plan';
import { Request } from '../../dto/billing-api/subscription-plans/POST';
import container from '../../inversify/inversify.create-subscription-plan.config';
import TYPES from '../../inversify/types';

export const handler: APIGatewayProxyHandler = async (event) => {
  console.log('Handler Event: ', event);

  let response;

  try {
    const jsonSerializer = new JsonSerializer();
    const request = jsonSerializer.deserializeObject<Request>(
      JSON.parse(event.body!),
      Request
    ) as Request;

    const controller = container.get<ICreateSubscriptionPlanController>(
      TYPES.CreateSubscriptionPlanController
    );
    const config = container.get<ICreateSubscriptionPlanControllerConfig>(
      TYPES.CreateSubscriptionPlanConfig
    );
    config.build(request);
    const result = await controller.process(config);
    response = buildApiGatewayCreatedResponse(result.getResponse());
  } catch (error) {
    console.error('Handler error: ', error);
    throw error; // TODO: Replace this with custom error in the src/utils/custom-error file
  }
  console.log('response:', response);
  return response;
};
