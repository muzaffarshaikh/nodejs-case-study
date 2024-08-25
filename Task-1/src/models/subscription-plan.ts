import { JsonObject, JsonProperty } from 'typescript-json-serializer';
import { attribute, hashKey } from '@aws/dynamodb-data-mapper-annotations';
import Pricing from './pricing';

export enum SubscriptionName {
  FREE = 'FREE',
  BASIC = 'BASIC',
  PRO = 'PRO',
  ENTERPRISE = 'ENTERPRISE',
}

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

@JsonObject()
export default class SubscriptionPlan {
  @hashKey()
  @JsonProperty({ name: 'id' })
  private id!: string;

  @attribute()
  @JsonProperty({ name: 'name' })
  private name!: string;

  @attribute()
  @JsonProperty({ name: 'pricing' })
  private pricing!: Pricing;

  @attribute()
  @JsonProperty({ name: 'status' })
  private status!: SubscriptionStatus;

  setID(value: string): void {
    this.id = value;
  }

  setStatus(status: SubscriptionStatus): void {
    this.status = status;
  }
}
