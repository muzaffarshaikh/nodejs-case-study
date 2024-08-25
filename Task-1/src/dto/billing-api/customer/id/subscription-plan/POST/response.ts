import { JsonObject, JsonProperty } from 'typescript-json-serializer';
import SubscriptionPlan from '../../../../common/subscription-plan';

@JsonObject()
export default class Response {
  @JsonProperty({ name: 'id' })
  private id!: string;

  @JsonProperty({ name: 'subscriptionPlan' })
  private subscriptionPlan!: SubscriptionPlan;
}
