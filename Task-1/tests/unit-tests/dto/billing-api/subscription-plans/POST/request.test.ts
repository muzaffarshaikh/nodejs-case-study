import { JsonSerializer } from 'typescript-json-serializer';
import { Request } from '../../../../../../src/dto/billing-api/subscription-plans/POST';
import * as requestJSON from '../../../../../mock-data/dto/billing-api/subscription-plans/POST/request.json';

describe('dto/order/id/event/driver-requirement-updated/POST/request', () => {
  describe('isValid()', () => {
    const jsonSerializer = new JsonSerializer();

    it('should not return error for proper request', () => {
      const request = jsonSerializer.deserializeObject<Request>(
        requestJSON,
        Request
      ) as Request;
      const result = request.validate();
      expect(result.error).toBeFalsy();
    });

    it.each([
      [
        {
          ...requestJSON,
          name: undefined,
        },
      ],
      [
        {
          ...requestJSON,
          pricing: undefined,
        },
      ],
    ])(
      'should return an error when required fields are not present',
      async (requestPayload) => {
        const request = jsonSerializer.deserializeObject<Request>(
          requestPayload,
          Request
        ) as Request;

        const result = request.validate();
        expect(result.error).toBeTruthy();
      }
    );
  });
});
