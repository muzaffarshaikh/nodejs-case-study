import { Response } from '../../../dto/billing-api/customer/id/subscription-plan/POST';

export default interface IResult {
  build(response: Response): void;
  getResponse(): Response;
}
