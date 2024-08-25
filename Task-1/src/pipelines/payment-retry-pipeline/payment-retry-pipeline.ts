import { SQSHandler, SQSRecord } from 'aws-lambda';
import { JsonSerializer } from 'typescript-json-serializer';
import container from '../../inversify/inversify.process-payment.config';
import TYPES from '../../inversify/types';
import {
  IConfig as IProcessPaymentControllerConfig,
  IController as IProcessPaymentController,
} from '../../controllers/interfaces/process-payment';
import Request from '../../dto/billing-api/customer/id/payments/POST/request';

// This pipeline of SQS handler uses the same controller initially used for payment update.
export const handler: SQSHandler = async (event) => {
  try {
    const receivedEvents: Array<SQSRecord> = event.Records;
    console.log(`Records: ${JSON.stringify(receivedEvents)}`);
    const jsonSerializer = new JsonSerializer();
    const maxRetryCount = 3;

    await Promise.all(
      receivedEvents.map(async (receivedEvent: SQSRecord) => {
        const retryRequest = jsonSerializer.deserializeObject(
          JSON.parse(receivedEvent.body),
          Request
        ) as Request;
        try {
          if (retryRequest!.getRetryCount() <= maxRetryCount) {
            const controller = container.get<IProcessPaymentController>(
              TYPES.ProcessPaymentController
            );
            const config = container.get<IProcessPaymentControllerConfig>(
              TYPES.ProcessPaymentConfig
            );
            config.build(retryRequest, retryRequest.getCustomerID());
            const result = await controller.process(config);

            console.log(
              `Record processing success. Record:`,
              JSON.stringify(retryRequest)
            );
          }
        } catch (error) {
          console.error(
            `Record processing failed. Record:`,
            JSON.stringify(retryRequest)
          );
        }
      })
    );

    console.log(`All Records Processed`);
  } catch (error) {
    console.error(`Handler error: ${error}`);
  }
};
