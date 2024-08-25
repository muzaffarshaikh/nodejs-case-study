import { Response } from '../../../dto/billing-api/generate-invoice';

export default interface IResult {
  build(response: Response): void;
  getResponse(): Response;
}
