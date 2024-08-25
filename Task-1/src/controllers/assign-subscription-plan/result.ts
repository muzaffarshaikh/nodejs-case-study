import { injectable } from 'inversify';
import { IResult } from '../interfaces/assign-subscription-plan';
import { Response } from '../../dto/billing-api/customer/id/subscription-plan/POST';

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
