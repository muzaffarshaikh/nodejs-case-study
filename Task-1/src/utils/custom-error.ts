import { JsonObject, JsonProperty } from 'typescript-json-serializer';

@JsonObject()
export default class CustomError {
  @JsonProperty({ name: 'code' })
  private code!: string;

  @JsonProperty({ name: 'message' })
  private message!: string;

  constructor(code: string, message: string) {
    this.code = code;
    this.message = message;
  }
}
