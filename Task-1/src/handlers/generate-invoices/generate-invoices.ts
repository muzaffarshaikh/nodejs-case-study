import { APIGatewayProxyHandler } from 'aws-lambda';
// import * as HttpStatus from 'http-status';
import { buildApiGatewayOkResponse } from 'aws-lambda-response-builder';
import { IController as IGenerateInvoicesController } from '../../controllers/interfaces/generate-invoice';
import container from '../../inversify/inversify.generate-invoice.config';
import TYPES from '../../inversify/types';

export const handler: APIGatewayProxyHandler = async (event) => {
  console.log('Handler Event: ', event);

  let response;

  try {
    const controller = container.get<IGenerateInvoicesController>(
      TYPES.GenerateInvoicesController
    );
    const result = await controller.process();
    response = buildApiGatewayOkResponse(result.getResponse());
  } catch (error) {
    console.error('Handler error: ', error);
    throw error; // TODO: Replace this with custom error in the src/utils/custom-error file
  }
  console.log('response:', response);
  return response;
};
