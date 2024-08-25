import { JsonObject, JsonProperty } from 'typescript-json-serializer';

@JsonObject()
export default class SubscriptionHistory {
  @JsonProperty({ name: 'subscriptionName' })
  private subscriptionName!: string;

  @JsonProperty({ name: 'expirationDate' })
  private expirationDate!: string;

  constructor(subscriptionName: string, expirationDate: string) {
    this.subscriptionName = subscriptionName;
    this.expirationDate = expirationDate;
  }
}
