import { JsonObject, JsonProperty } from 'typescript-json-serializer';

@JsonObject()
export default class Request {
  @JsonProperty({ name: 'price' })
  private price!: number;

  @JsonProperty({ name: 'currency' })
  private currency!: string;

  @JsonProperty({ name: 'billingCycle' })
  private billingCycle!: number;

  getBillingCycle(): number {
    return this.billingCycle;
  }

  getPrice(): number {
    return this.price;
  }
}
