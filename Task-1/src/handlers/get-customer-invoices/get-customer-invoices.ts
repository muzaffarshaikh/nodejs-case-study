import { APIGatewayProxyHandler } from 'aws-lambda';
import { JsonSerializer } from 'typescript-json-serializer';
import {
  buildApiGatewayCreatedResponse,
  buildApiGatewayOkResponse,
} from 'aws-lambda-response-builder';
import {
  IConfig as IGetCustomerInvoicesControllerConfig,
  IController as IGetCustomerInvoicesController,
} from '../../controllers/interfaces/get-customer-invoices';
import container from '../../inversify/inversify.get-customer-invoices.config';
import TYPES from '../../inversify/types';

export const handler: APIGatewayProxyHandler = async (event) => {
  console.log('Handler Event: ', event);

  let response;

  try {
    const customerID = event.pathParameters!.id!;
    const controller = container.get<IGetCustomerInvoicesController>(
      TYPES.GetCustomerInvoicesController
    );
    const config = container.get<IGetCustomerInvoicesControllerConfig>(
      TYPES.GetCustomerInvoicesConfig
    );
    config.build(customerID);
    const result = await controller.process(config);
    response = buildApiGatewayOkResponse(result.getResponse());
  } catch (error) {
    console.error('Handler error: ', error);
    throw error; // TODO: Replace this with custom error in the src/utils/custom-error file
  }
  console.log('response:', response);
  return response;
};
