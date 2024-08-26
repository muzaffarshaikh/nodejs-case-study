import { Container } from 'inversify';
import {
  IController as IGetCustomerInvoicesController,
  IResult as IGetCustomerInvoicesResult,
} from '../controllers/interfaces/get-customer-invoices';
import {
  Controller as GetCustomerInvoicesController,
  Result as GetCustomerInvoicesResult,
} from '../controllers/get-customer-invoices';
import { IInvoiceService } from '../services/interfaces';
import TYPES from './types';
import { InvoiceService } from '../services';

const container = new Container();

container
  .bind<IGetCustomerInvoicesController>(TYPES.GetCustomerInvoicesController)
  .to(GetCustomerInvoicesController);

container
  .bind<IGetCustomerInvoicesResult>(TYPES.GetCustomerInvoicesResult)
  .to(GetCustomerInvoicesResult);

container.bind<IInvoiceService>(TYPES.EmailService).to(InvoiceService);

export default container;
