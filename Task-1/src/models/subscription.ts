import { JsonObject, JsonProperty } from 'typescript-json-serializer';
import { attribute, hashKey } from '@aws/dynamodb-data-mapper-annotations';
import Pricing from './pricing';

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
  EXPIRED = 'EXPIRED',
}

@JsonObject()
export default class Subscription {
  @hashKey()
  @JsonProperty({ name: 'id' })
  private id!: string;

  @attribute()
  @JsonProperty({ name: 'customerID' })
  private customerID!: string;

  @attribute()
  @JsonProperty({ name: 'subscriptionPlanID' })
  private subscriptionPlanID!: string;

  @attribute()
  @JsonProperty({ name: 'subscriptionStartDate' })
  private subscriptionStartDate!: string;

  @attribute()
  @JsonProperty({ name: 'subscriptionEndDate' })
  private subscriptionEndDate!: string;

  @attribute()
  @JsonProperty({ name: 'status' })
  private status!: string;

  @attribute()
  @JsonProperty({ name: 'createdAt' })
  private createdAt!: string;

  build(
    id: string,
    customerID: string,
    subscriptionPlanID: string,
    subscriptionStartDate: string,
    subscriptionEndDate: string,
    status: SubscriptionStatus,
    createdAt: string
  ) {
    this.id = id;
    this.customerID = customerID;
    this.subscriptionPlanID = subscriptionPlanID;
    this.subscriptionStartDate = subscriptionStartDate;
    this.subscriptionEndDate = subscriptionEndDate;
    this.status = status;
    this.createdAt = createdAt;
  }
}
