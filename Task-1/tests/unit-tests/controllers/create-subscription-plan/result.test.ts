import { JsonSerializer } from 'typescript-json-serializer';
import { Result } from '../../../../src/controllers/create-subscription-plan';
import { Response } from '../../../../src/dto/billing-api/subscription-plans/POST';
import * as createSubscriptionPlanResponseJSON from '../../../mock-data/dto/billing-api/subscription-plans/POST/response.json';

describe('controllers/create-subscription-plan/result', () => {
  const jsonSerializer = new JsonSerializer();
  const createSubscriptionPlanResponse =
    jsonSerializer.deserializeObject<Response>(
      createSubscriptionPlanResponseJSON,
      Response
    ) as Response;
  const createSubscriptionPlanControllerResult = new Result();

  const buildResultSpy = jest.spyOn(Result.prototype, 'build');
  createSubscriptionPlanControllerResult.build(createSubscriptionPlanResponse);

  describe('build()', () => {
    it('should build a result by calling it with Response', () => {
      expect(buildResultSpy).toHaveBeenLastCalledWith(expect.any(Response));
    });
  });

  describe('getResponse()', () => {
    it('should return Response', () => {
      expect(createSubscriptionPlanControllerResult.getResponse()).toBe(
        createSubscriptionPlanResponse
      );
    });
  });
});
