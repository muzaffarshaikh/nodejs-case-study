import { injectable } from 'inversify';
import { IResult } from '../interfaces/create-subscription-plan';
import Response from '../../dto/billing-api/subscription-plans/POST/response';

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
