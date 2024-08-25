import * as Joi from 'joi';
import { JsonObject, JsonProperty } from 'typescript-json-serializer';
import { PaymentMethod } from '../../../../../../models/payment';

@JsonObject()
export default class Request {
  @JsonProperty({ name: 'amount' })
  private amount!: number;

  @JsonProperty({ name: 'currency' })
  private currency!: string;

  @JsonProperty({ name: 'paymentMethod' })
  private paymentMethod!: PaymentMethod;

  @JsonProperty({ name: 'invoiceID' })
  private invoiceID!: string;

  /* This property should not be implemented here.
   * Instead there should be another DTO which will be an event for retry pipeline.
   * Due to time constraint, this is added here provisionally */
  @JsonProperty({ name: 'retryCount' })
  private retryCount!: number;

  @JsonProperty({ name: 'customerID' })
  private customerID!: string;

  getRetryCount(): number {
    return this.retryCount;
  }

  setRetryCount(count: number): void {
    this.retryCount = count;
  }

  setCustomerID(id: string): void {
    this.customerID = id;
  }

  getCustomerID(): string {
    return this.customerID;
  }

  getInvoiceID(): string {
    return this.invoiceID;
  }

  getPaymentMethod(): PaymentMethod {
    return this.paymentMethod;
  }

  getAmount(): number {
    return this.amount;
  }

  validate(): Joi.ValidationResult {
    const schema = Joi.object({
      amount: Joi.number().required(),
      currency: Joi.string().required(),
      paymentMethod: Joi.string()
        .required()
        .valid(...Object.values(PaymentMethod)),
      invoiceID: Joi.string().required(),
    });

    return schema.validate(this);
  }
}
