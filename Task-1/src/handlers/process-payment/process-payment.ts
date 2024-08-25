import { APIGatewayProxyHandler } from 'aws-lambda';
import { JsonSerializer } from 'typescript-json-serializer';
import * as AWS from 'aws-sdk';
import { buildApiGatewayCreatedResponse } from 'aws-lambda-response-builder';
import {
  IConfig as IProcessPaymentControllerConfig,
  IController as IProcessPaymentController,
} from '../../controllers/interfaces/process-payment';
import { Request } from '../../dto/billing-api/customer/id/payments/POST';
import container from '../../inversify/inversify.process-payment.config';
import TYPES from '../../inversify/types';

export const handler: APIGatewayProxyHandler = async (event) => {
  console.log('Handler Event: ', event);

  let response;

  const customerID = event.pathParameters!.id!;
  const jsonSerializer = new JsonSerializer();
  const request = jsonSerializer.deserializeObject<Request>(
    JSON.parse(event.body!),
    Request
  ) as Request;

  try {
    const controller = container.get<IProcessPaymentController>(
      TYPES.ProcessPaymentController
    );
    const config = container.get<IProcessPaymentControllerConfig>(
      TYPES.ProcessPaymentConfig
    );
    config.build(request, customerID);
    const result = await controller.process(config);
    response = buildApiGatewayCreatedResponse(result.getResponse());
  } catch (error) {
    console.error('Handler error: ', error);

    // Incase of any error, publish the payment payload to SNS for retrying.
    const sns = new AWS.SNS({ region: process.env.AWSRegion });
    const requestRetryCount = request.getRetryCount();
    const retryCount = requestRetryCount ? requestRetryCount + 1 : 1;
    request.setRetryCount(retryCount);
    request.setCustomerID(customerID);
    const params = {
      Message: JSON.stringify(request),
      TopicArn: process.env.OrderRejectedEventTopicARN,
    };

    const publishedEvent = await sns.publish(params).promise();
    console.log(`Published event: ${JSON.stringify(publishedEvent)}`);

    throw error; // TODO: Replace this with custom error in the src/utils/custom-error file
  }
  console.log('response:', response);
  return response;
};
