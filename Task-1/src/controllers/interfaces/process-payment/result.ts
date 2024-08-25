import { Response } from '../../../dto/billing-api/customer/id/payments/POST';

export default interface IResult {
  build(response: Response): void;
  getResponse(): Response;
}
