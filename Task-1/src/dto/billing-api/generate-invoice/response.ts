import { JsonObject, JsonProperty } from 'typescript-json-serializer';

@JsonObject()
export default class Request {
  @JsonProperty({ name: 'success' })
  private success!: boolean;
}
