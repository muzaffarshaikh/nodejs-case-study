import { JsonObject, JsonProperty } from 'typescript-json-serializer';
import { Invoice } from '../../../../../../models';

@JsonObject()
export default class Response {
  @JsonProperty({ name: 'invoices' })
  private invoices!: Array<Invoice>;

  build(invoices: Array<Invoice>): void {
    this.invoices = invoices;
  }
}
