import { inject, injectable } from 'inversify';
import { JsonSerializer } from 'typescript-json-serializer';
import { v4 as UUIDv4 } from 'uuid';
import {
  IController as IGenerateInvoiceController,
  IResult as IGenerateInvoiceResult,
} from '../../controllers/interfaces/generate-invoice';
import { ICustomerService, IEmailService } from '../../services/interfaces';
import { Response } from '../../dto/billing-api/generate-invoice';
import { Invoice } from '../../models';
import TYPES from '../../inversify/types';

enum ErrorCodes {
  FORBIDDEN_ERROR = 'error.billing-api.generate-invoice.forbidden',
}

const jsonSerializer = new JsonSerializer();

@injectable()
export default class Controller implements IGenerateInvoiceController {
  private result!: IGenerateInvoiceResult;

  private customerService!: ICustomerService;

  private emailService!: IEmailService;

  constructor(
    @inject(TYPES.GenerateInvoiceResult)
    result: IGenerateInvoiceResult,
    @inject(TYPES.CustomerService)
    customerService: ICustomerService,
    @inject(TYPES.EmailService)
    emailService: IEmailService
  ) {
    this.result = result;
    this.customerService = customerService;
    this.emailService = emailService;
  }

  async process(): Promise<IGenerateInvoiceResult> {
    try {
      const customers = await this.customerService.getAllCustomers();

      Promise.all(
        customers.map((customer) => {
          // TODO: Invoice generation logic for each customer.
          const invoice = new Invoice();
          invoice.build(UUIDv4(), customer.getID(), 100, 'generated');
          // Save the invoice in DB. This is to later update the invoice status for payment.
          this.emailService.sendEmail(
            'Invoice generated!',
            'Your invoice has been generated.',
            'senderemail@test.com',
            'receiveremail@test.com'
          );
        })
      );

      const response = jsonSerializer.deserializeObject(
        { success: true },
        Response
      ) as Response;
    } catch (error) {
      console.error('GenerateInvoiceController.process() Error:', error);
      this.result.build(
        jsonSerializer.deserializeObject(
          { success: false },
          Response
        ) as Response
      );
    }
    return this.result;
  }

  calculateProratedPriceForAMonth(
    currentPlanPrice: number,
    newPlanPrice: number,
    numberOfDaysUsed: number,
    daysInBillingCycle: number
  ) {
    // The price for a day in the current plan
    const currentPlanDailyPrice = currentPlanPrice / daysInBillingCycle;
    // The price for a day in the current plan
    const newPlanDailyPrice = newPlanPrice / daysInBillingCycle;
    // Total cost incurred for the used days
    const totalCostForUsedDays = currentPlanDailyPrice * numberOfDaysUsed;
    // Days remain for the new plan
    const remainingDays = daysInBillingCycle - numberOfDaysUsed;
    // Total cost incurred for the remaining days
    const totalCostRemainingDays = newPlanDailyPrice * remainingDays;

    return totalCostRemainingDays + totalCostForUsedDays;
  }
}
