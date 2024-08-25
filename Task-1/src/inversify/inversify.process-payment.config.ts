import { Container } from 'inversify';
import {
  IController as IGenerateInvoicesController,
  IResult as IGenerateInvoicesResult,
} from '../controllers/interfaces/generate-invoice';
import {
  Controller as GenerateInvoicesController,
  Result as GenerateInvoicesResult,
} from '../controllers/generate-invoice';
import {
  IEmailService,
  IInvoiceService,
  IPaymentService,
} from '../services/interfaces';
import { EmailService } from '../services';
import TYPES from './types';
import { InvoiceService, PaymentService } from '../services';

const container = new Container();

container
  .bind<IGenerateInvoicesController>(TYPES.GenerateInvoicesController)
  .to(GenerateInvoicesController);

container
  .bind<IGenerateInvoicesResult>(TYPES.GenerateInvoicesResult)
  .to(GenerateInvoicesResult);

container.bind<IEmailService>(TYPES.EmailService).to(EmailService);
container.bind<IInvoiceService>(TYPES.EmailService).to(InvoiceService);
container.bind<IPaymentService>(TYPES.EmailService).to(PaymentService);

export default container;
