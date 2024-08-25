import { APIGatewayProxyHandler } from 'aws-lambda';
// import * as HttpStatus from 'http-status';
import { JsonSerializer } from 'typescript-json-serializer';
import { buildApiGatewayOkResponse } from 'aws-lambda-response-builder';
import {
  IConfig as IAssignSubscriptionPlanControllerConfig,
  IController as IAssignSubscriptionPlanController,
} from '../../controllers/interfaces/assign-subscription-plan';
import { Request } from '../../dto/billing-api/customer/id/subscription-plan/POST';
import container from '../../inversify/inversify.assign-subscription-plan.config';
import TYPES from '../../inversify/types';

export const handler: APIGatewayProxyHandler = async (event) => {
  console.log('Handler Event: ', event);

  let response;

  try {
    const customerID = event.pathParameters!.id;
    const jsonSerializer = new JsonSerializer();
    const request = jsonSerializer.deserializeObject<Request>(
      JSON.parse(event.body!),
      Request
    ) as Request;

    const controller = container.get<IAssignSubscriptionPlanController>(
      TYPES.AssignSubscriptionPlanController
    );
    const config = container.get<IAssignSubscriptionPlanControllerConfig>(
      TYPES.AssignSubscriptionPlanConfig
    );
    config.build(request, customerID!);
    const result = await controller.process(config);
    response = buildApiGatewayOkResponse(result.getResponse());
  } catch (error) {
    console.error('Handler error: ', error);
    throw error; // TODO: Replace this with custom error in the src/utils/custom-error file
  }
  console.log('response:', response);
  return response;
};
