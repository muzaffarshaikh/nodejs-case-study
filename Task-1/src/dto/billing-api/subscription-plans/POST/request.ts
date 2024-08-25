import * as Joi from 'joi';
import { JsonObject, JsonProperty } from 'typescript-json-serializer';
import Pricing from '../../common/pricing';

@JsonObject()
export default class Request {
  @JsonProperty({ name: 'name' })
  private name!: string;

  @JsonProperty({ name: 'pricing' })
  private pricing!: Pricing;

  validate(): Joi.ValidationResult {
    const pricingSchema = Joi.object({
      price: Joi.string().required(),
      currency: Joi.string().required(),
      billingCycle: Joi.number().required() // Update documentation from string to number.
    });

    const schema = Joi.object({
      name: Joi.string().required(),
      pricing: pricingSchema.required(),
    });

    return schema.validate(this);
  }
}
