import { attribute, hashKey } from '@aws/dynamodb-data-mapper-annotations';
import { JsonObject, JsonProperty } from 'typescript-json-serializer';

@JsonObject()
export default class Invoice {
  @hashKey()
  @JsonProperty({ name: 'id' })
  private id!: string;

  @attribute()
  @JsonProperty({ name: 'customerID' })
  private customerID!: string;

  @attribute()
  @JsonProperty({ name: 'isPaid' })
  private isPaid?: boolean;

  @attribute()
  @JsonProperty({ name: 'paymentDate' })
  private paymentDate?: string;

  @attribute()
  @JsonProperty({ name: 'status' })
  private status!: string;

  @attribute()
  @JsonProperty({ name: 'totalAmount' })
  private totalAmount!: number;

  setID(id: string): void {
    this.id = id;
  }

  setPaymentDate(paymentDate: string): void {
    this.paymentDate = paymentDate;
  }

  setIsPaid(value: boolean): void {
    this.isPaid = value;
  }

  getCustomerID(): string {
    return this.customerID;
  }

  build(id: string, customerID: string, totalAmount: number, status: string) {
    this.id = id;
    this.customerID = customerID;
    this.isPaid = false;
    this.totalAmount = totalAmount;
  }
}
