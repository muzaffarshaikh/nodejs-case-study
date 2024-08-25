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
  @JsonProperty({ name: 'subscriptionPlan' })
  private subscriptionPlan!: SubscriptionPlan;

  @attribute()
  @JsonProperty({ name: 'isSubscriptionActive' })
  private isSubscriptionActive!: boolean;

  @attribute()
  @JsonProperty({ name: 'subscriptionHistory' })
  private subscriptionHistory!: Array<SubscriptionHistory>;

  setID(id: string): void {
    this.id = id;
  }

  setSubscriptionPlan(subscriptionPlan: SubscriptionPlan): void {
    this.subscriptionPlan = subscriptionPlan;
  }

  // setSubscriptionHistory(
  //   subscriptionHistory: Array<SubscriptionHistory>
  // ): void {
  //   this.subscriptionHistory = subscriptionHistory;
  // }

  // getSubscriptionHistory(): Array<SubscriptionHistory> {
  //   return this.subscriptionHistory;
  // }

  activateSubscription(): void {
    this.isSubscriptionActive = true;
  }
}
