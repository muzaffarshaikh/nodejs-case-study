import { JsonObject, JsonProperty } from 'typescript-json-serializer';

@JsonObject()
export default class Invoice {
  @JsonProperty({ name: 'id' })
  private id!: string;

  @JsonProperty({ name: 'customerID' })
  private customerID!: string;

  @JsonProperty({ name: 'isPaid' })
  private isPaid?: boolean;

  @JsonProperty({ name: 'paymentDate' })
  private paymentDate?: string;

  @JsonProperty({ name: 'totalAmount' })
  private totalAmount!: number;

  build(id: string, customerID: string, totalAmount: number) {
    this.id = id;
    this.customerID = customerID;
    this.isPaid = false;
    this.totalAmount = totalAmount;
  }
}
