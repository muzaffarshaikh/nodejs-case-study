import { JsonSerializer } from 'typescript-json-serializer';
import { Config } from '../../../../src/controllers/create-subscription-plan';
import { Request } from '../../../../src/dto/billing-api/subscription-plans/POST';
import * as createSubscriptionPlanRequestJSON from '../../../mock-data/dto/billing-api/subscription-plans/POST/request.json';

describe('controllers/create-subscription-plan/config', () => {
  const jsonSerializer = new JsonSerializer();
  const request = jsonSerializer.deserializeObject<Request>(
    createSubscriptionPlanRequestJSON,
    Request
  ) as Request;
  const createSubscriptionPlanControllerConfig = new Config();

  const buildConfigSpy = jest.spyOn(Config.prototype, 'build');
  createSubscriptionPlanControllerConfig.build(request);

  describe('build()', () => {
    it('should build a config by calling it with Request', () => {
      expect(buildConfigSpy).toHaveBeenCalledWith(expect.any(Request));
    });
  });

  describe('getRequest()', () => {
    it('should return Driver Requirement Updated Request', () => {
      expect(createSubscriptionPlanControllerConfig.getRequest()).toBe(request);
    });
  });
});
