import { JsonObject, JsonProperty } from 'typescript-json-serializer';
import { attribute, hashKey } from '@aws/dynamodb-data-mapper-annotations';
import SubscriptionPlan from './subscription-plan';
import SubscriptionHistory from './subscription-history';

@JsonObject()
export default class Customer {
  @hashKey()
  @JsonProperty({ name: 'id' })
  private id!: string;

  @attribute()
  @JsonProperty({ name: 'name' })
  private name!: string;

  @attribute()
  @JsonProperty({ name: 'currentSubscriptionPlan' })
  private subscriptionPlan!: SubscriptionPlan;

  @attribute()
  @JsonProperty({ name: 'isSubscriptionActive' })
  private isSubscriptionActive!: boolean;

  setID(id: string): void {
    this.id = id;
  }

  getID(): string {
    return this.id;
  }

  setSubscriptionPlan(subscriptionPlan: SubscriptionPlan): void {
    this.subscriptionPlan = subscriptionPlan;
  }

  activateSubscription(): void {
    this.isSubscriptionActive = true;
  }
}
