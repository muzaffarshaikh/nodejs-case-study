import * as Joi from 'joi';
import { JsonObject, JsonProperty } from 'typescript-json-serializer';

@JsonObject()
export default class Request {
  @JsonProperty({ name: 'subscriptionPlanID' })
  private subscriptionPlanID!: string;

  getSubscriptionPlanID(): string {
    return this.subscriptionPlanID;
  }

  validate(): Joi.ValidationResult {
    const schema = Joi.object({
      subscriptionPlanID: Joi.string().required(),
    });

    return schema.validate(this);
  }
}
