import Response from '../../../dto/billing-api/customer/id/invoices/GET';

export default interface IResult {
  build(response: Response): void;
  getResponse(): Response;
}
