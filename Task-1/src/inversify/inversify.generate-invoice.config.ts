import { Container } from 'inversify';
import {
  IController as IGenerateInvoicesController,
  IResult as IGenerateInvoicesResult,
} from '../controllers/interfaces/generate-invoice';
import {
  Controller as GenerateInvoicesController,
  Result as GenerateInvoicesResult,
} from '../controllers/generate-invoice';
import { IEmailService } from '../services/interfaces';
import { EmailService } from '../services';
import TYPES from './types';

const container = new Container();

container
  .bind<IGenerateInvoicesController>(TYPES.GenerateInvoicesController)
  .to(GenerateInvoicesController);

container
  .bind<IGenerateInvoicesResult>(TYPES.GenerateInvoicesResult)
  .to(GenerateInvoicesResult);

container.bind<IEmailService>(TYPES.EmailService).to(EmailService);

export default container;
