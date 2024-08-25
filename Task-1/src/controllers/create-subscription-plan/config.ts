import { injectable } from 'inversify';
import Request from '../../dto/billing-api/subscription-plans/POST/request';
import { IConfig } from '../interfaces/create-subscription-plan';

@injectable()
export default class Config implements IConfig {
  private request!: Request;

  build(request: Request): void {
    this.request = request;
  }

  getRequest(): Request {
    return this.request;
  }
}
