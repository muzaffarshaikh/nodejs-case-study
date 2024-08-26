import { inject, injectable } from 'inversify';
import { JsonSerializer } from 'typescript-json-serializer';
import { v4 as UUIDv4 } from 'uuid';
import {
  IController as IGetCustomerInvoicesController,
  IConfig as IGetCustomerInvoicesConfig,
  IResult as IGetCustomerInvoicesResult,
} from '../../controllers/interfaces/get-customer-invoices';
import { IInvoiceService } from '../../services/interfaces';
import { Response } from '../../dto/billing-api/customer/id/invoices/GET';
import TYPES from '../../inversify/types';

enum ErrorCodes {
  FORBIDDEN_ERROR = 'error.billing-api.get-customer-invoices.forbidden',
}

@injectable()
export default class Controller implements IGetCustomerInvoicesController {
  private result!: IGetCustomerInvoicesResult;

  private invoiceService!: IInvoiceService;

  constructor(
    @inject(TYPES.GetCustomerInvoicesResult)
    result: IGetCustomerInvoicesResult,
    @inject(TYPES.InvoiceService)
    invoiceService: IInvoiceService
  ) {
    this.result = result;
    this.invoiceService = invoiceService;
  }

  async process(
    config: IGetCustomerInvoicesConfig
  ): Promise<IGetCustomerInvoicesResult> {
    try {
      const customerID = config.getCustomerID();
      const jsonSerializer = new JsonSerializer();

      const getCustomerInvoicesResponse =
        await this.invoiceService.getInvoicesByCustomerID(customerID);

      const response = jsonSerializer.deserializeObject(
        getCustomerInvoicesResponse,
        Response
      ) as Response;

      this.result.build(response);
    } catch (error) {
      console.error('GetCustomerInvoicesController.process() Error:', error);
      throw error;
    }
    return this.result;
  }
}
