import { JsonObject, JsonProperty } from 'typescript-json-serializer';
import Pricing from './pricing';

@JsonObject()
export default class Request {
  @JsonProperty({ name: 'id' })
  private id!: string;

  @JsonProperty({ name: 'name' })
  private name!: string;

  @JsonProperty({ name: 'pricing' })
  private pricing!: Pricing;

  setID(value: string): void {
    this.id = value
  }
}
