import { JsonObject, JsonProperty } from 'typescript-json-serializer';
import Request from './request';

@JsonObject()
export default class Response extends Request {
  @JsonProperty({ name: 'id' })
  private id!: string;

  @JsonProperty({ name: 'status' })
  private status!: string;

  @JsonProperty({ name: 'createdAt' })
  private createdAt!: string;

  build(status: string, id: string, createdAt: string): void {
    this.id = id;
    this.status = status;
    this.createdAt = createdAt;
  }
}
