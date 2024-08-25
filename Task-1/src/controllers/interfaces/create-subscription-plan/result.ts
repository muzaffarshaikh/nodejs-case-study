import Response from '../../../dto/billing-api/subscription-plans/POST/response';

export default interface IResult {
  build(response: Response): void;
  getResponse(): Response;
}
