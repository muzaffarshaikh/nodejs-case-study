import { Request } from '../../../dto/billing-api/subscription-plans/POST';

export default interface IConfig {
  build(request: Request): void;
  getRequest(): Request;
}
