import { JsonObject, JsonProperty } from 'typescript-json-serializer';
import Pricing from './pricing';

@JsonObject()
export default class Request {
  @JsonProperty({ name: 'price' })
  private price!: Pricing;

  @JsonProperty({ name: 'currency' })
  private currency!: string;

  @JsonProperty({ name: 'billingCycle' })
  private billingCycle!: number;
}
