import { attribute, hashKey } from '@aws/dynamodb-data-mapper-annotations';
import { JsonObject, JsonProperty } from 'typescript-json-serializer';

export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  PAYPAL = 'PAYPAL',
  APPLE_PAY = 'APPLE_PAY',
}

@JsonObject()
export default class Payment {
  @hashKey()
  @JsonProperty({ name: 'id' })
  private id!: string;

  @attribute()
  @JsonProperty({ name: 'invoiceID' })
  private invoiceID!: string;

  @attribute()
  @JsonProperty({ name: 'paymentMethod' })
  private paymentMethod!: PaymentMethod;

  @attribute()
  @JsonProperty({ name: 'createdAt' })
  private createdAt!: string;

  @attribute()
  @JsonProperty({ name: 'amount' })
  private amount!: number;

  @attribute()
  @JsonProperty({ name: 'customerID' })
  private customerID!: string;

  build(
    id: string,
    invoiceID: string,
    paymentMethod: PaymentMethod,
    amount: number,
    customerID: string
  ) {
    this.id = id;
    this.invoiceID = invoiceID;
    this.paymentMethod = paymentMethod;
    this.createdAt = this.createdAt;
    this.amount = amount;
    this.customerID = customerID;
  }
}
