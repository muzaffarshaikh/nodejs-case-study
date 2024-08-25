import { injectable } from 'inversify';
import { IResult } from '../interfaces/generate-invoice';
import { Response } from '../../dto/billing-api/generate-invoice';

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
