import { JsonObject, JsonProperty } from 'typescript-json-serializer';
import { attribute, hashKey } from '@aws/dynamodb-data-mapper-annotations';
import SubscriptionPlan from './subscription-plan';

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
  private currentSubscriptionPlan!: SubscriptionPlan;

  @attribute()
  @JsonProperty({ name: 'previousSubscriptionPlan' })
  private previousSubscriptionPlan!: SubscriptionPlan;

  @attribute()
  @JsonProperty({ name: 'isSubscriptionActive' })
  private isSubscriptionActive!: boolean;

  setID(id: string): void {
    this.id = id;
  }

  getID(): string {
    return this.id;
  }

  getCurrentSubscriptionPlan(): SubscriptionPlan {
    return this.currentSubscriptionPlan;
  }

  getPreviousSubscriptionPlan(): SubscriptionPlan {
    return this.previousSubscriptionPlan;
  }

  setCurrentSubscriptionPlan(subscriptionPlan: SubscriptionPlan): void {
    this.currentSubscriptionPlan = subscriptionPlan;
  }

  setPreviousSubscriptionPlan(subscriptionPlan: SubscriptionPlan): void {
    this.previousSubscriptionPlan = subscriptionPlan;
  }

  activateSubscription(): void {
    this.isSubscriptionActive = true;
  }
}
