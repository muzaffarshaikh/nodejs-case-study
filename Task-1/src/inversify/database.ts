import * as DynamoDB from 'aws-sdk/clients/dynamodb';
import { DataMapper } from '@aws/dynamodb-data-mapper';

export default function getDataMapper(): DataMapper {
  const client = new DynamoDB({
    endpoint: process.env.DynamoDBEndpoint,
  });
  const mapper = new DataMapper({ client });

  return mapper;
}
