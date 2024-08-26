import { JsonSerializer } from 'typescript-json-serializer';
import * as Joi from '@hapi/joi';
import { mock } from 'jest-mock-extended';
import {
  Config,
  Controller,
} from '../../../../src/controllers/create-subscription-plan';
import {
  Request,
  Response,
} from '../../../../src/dto/billing-api/subscription-plans/POST';
import * as createSubscriptionPlanRequestJSON from '../../../mock-data/dto/billing-api/subscription-plans/POST/request.json';
import {
  IConfig,
  IResult,
} from '../../../../src/controllers/interfaces/create-subscription-plan';
import { ISubscriptionPlanService } from '../../../../src/services/interfaces';
import { SubscriptionPlan } from '../../../../src/models';

describe('controllers/create-subscription-plan', () => {
  const jsonSerializer = new JsonSerializer();
  const request = jsonSerializer.deserializeObject<Request>(
    createSubscriptionPlanRequestJSON,
    Request
  ) as Request;

  const subscriptionPlanService = mock<ISubscriptionPlanService>();

  const mockedControllerConfig = mock<IConfig>();
  const mockedControllerResult = mock<IResult>();
  const controller = new Controller(
    mockedControllerResult,
    subscriptionPlanService
  );

  mockedControllerConfig.getRequest.mockReturnValue(request);
  subscriptionPlanService.createSubscriptionPlan.mockResolvedValue(
    new SubscriptionPlan()
  );

  const mockJoiValidationResultFailure: Joi.ValidationResult = {
    error: {
      message: 'ValidationError',
      name: 'ValidationError',
      isJoi: true,
      details: [
        {
          message: '',
          path: [],
          type: '',
        },
      ],
      _object: '',
      annotate() {
        return '';
      },
    },
    value: undefined,
  };

  describe('process()', () => {
    it('should return response', async () => {
      const result = await controller.process(mockedControllerConfig);
      expect(result.build).toHaveBeenCalledWith(expect.any(Response));
      expect(request.validate).toHaveBeenCalled();
    });

    it(`should respond with forbidden error when any validation error occurs`, async () => {
      jest
        .spyOn(Request.prototype, 'validate')
        .mockReturnValue(mockJoiValidationResultFailure);
      await expect(async () => {
        await controller.process(mockedControllerConfig);
      }).rejects.toHaveProperty(
        'code',
        'error.billing-api.create-subscription-plan.forbidden'
      );
    });

    it(`should update  with forbidden error when any validation error occurs`, async () => {
      jest
        .spyOn(Request.prototype, 'validate')
        .mockReturnValue(mockJoiValidationResultFailure);
      await expect(async () => {
        await controller.process(mockedControllerConfig);
      }).rejects.toHaveProperty(
        'code',
        'error.billing-api.create-subscription-plan.forbidden'
      );
    });
  });
});
