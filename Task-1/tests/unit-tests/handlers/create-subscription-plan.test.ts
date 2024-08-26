import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import * as HttpStatus from 'http-status';
import { when } from 'jest-when';
import { mock } from 'jest-mock-extended';
import { handler } from '../../../src/handlers/create-subscription-plan/create-subscription-plan';
import container from '../../../src/inversify/inversify.create-subscription-plan.config';
import TYPES from '../../../src/inversify/types';
import {
  IController,
  IConfig,
  IResult,
} from '../../../src/controllers/interfaces/create-subscription-plan';
import { Response } from '../../../src/dto/billing-api/subscription-plans/POST';

describe('driver-requirement-updated', () => {
  const containerGetSpy = jest.spyOn(container, 'get');

  const Controller = mock<IController>();
  const ControllerConfig = mock<IConfig>();
  const ControllerResult = mock<IResult>();

  const Response = deserialize<Response>(handlerResponse, Response);
  ControllerResult.getResponse.mockReturnValue(Response);

  Controller.process.mockResolvedValue(ControllerResult);

  when(containerGetSpy)
    .calledWith(TYPES.CreateSubscriptionPlanController)
    .mockReturnValue(Controller);

  when(containerGetSpy)
    .calledWith(TYPES.CreateSubscriptionPlanConfig)
    .mockReturnValue(ControllerConfig);

  when(containerGetSpy)
    .calledWith(TYPES.CreateSubscriptionPlanResult)
    .mockReturnValue(ControllerResult);

  afterEach(() => {
    Controller.process.mockRestore();
    ControllerResult.getResponse.mockRestore();
  });

  it('should respond with HTTP 201 for valid request', async () => {
    const result = await handler(
      {
        body: '{"name":"ENTERPRISE","pricing":{"price":50,"currency":"USD","billingCycle":30}}',
      } as APIGatewayProxyEvent,
      {} as Context,
      jest.fn()
    );
    expect(result).toHaveProperty('statusCode', HttpStatus.CREATED);
  });
});
