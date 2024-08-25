import { injectable } from 'inversify';
import { IResult } from '../interfaces/process-payment';
import { Response } from '../../dto/billing-api/customer/id/payments/POST';

@injectable()
export default class Result implements IResult {
  private response!: Response;

  build(response: Response): void {
    this.response = response;
  }

  getResponse(): Response {
    return this.response;
  }
}
