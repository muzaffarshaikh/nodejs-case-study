# Billing App

This repository contains design and implementation of 2 tasks: case study and refactor of code.

## Infrastructure

- [template.yaml](./template.yaml) The AWS resources are declared in this file.

## Script

- [tsconfig.json](./tsconfig.json) The project is written in TypeScript and the configuration is in this file.
- [webpack.config.ts](./webpack.config.ts) This file contains the configuration for webpack. Webpack helps with dependency injection, inversion of control and bundling and compiling of the source code.

## Source

- [src](./src) Contains the source-code for the billing app implementation.

### Local Requirements

- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- [AWS Account credentials installed on dev machine](#aws-profile-setup) (Optional)
- [SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)
- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/en)
- [DynamoDB NoSQL Workbench Setup on local machine](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.settingup.install.html)

#### DynamoDB Table Setup

1. Prerequisite: DynamoDB NoSQL workbench should be installed.
2. Create a "local-docker-compose.yaml" file.
3. Copy the following snippet and save it to the `local-docker-compose.yaml`.

```
version: "3"
services:

  dynamodb:
    image: amazon/dynamodb-local
    command: -jar DynamoDBLocal.jar -sharedDb -dbPath .
    ports:
      - "8000:8000"

```

4. Run the command `docker-compose -f local-docker-compose.yaml up` in the project terminal. This will run DynamoDB in a docker container.

#### Compile Project

Run the following command to compile the project
`npm run compile`

#### Build the SAM project

```
sam build --parallel
```

#### Invoking the local lambda function

Command:

```
sam local invoke {FUNCTION_NAME}  -e {PATH/TO/EVENT/FILE} --profile {YOUR_AWS_PROFILE}
--parameter-overrides Key1=Value1 Key2=Value2 --docker-network {YOUR_NETWORK_NAME}
```

Example:

```
sam local invoke "CreateSubscriptionPlanFunction"  -e events/create-subscription-plan-event.json --profile developer
--parameter-overrides Environment=local DynamoDBEndpoint=localhost:3001 SubscriptionPlanTableName=local-subscription-plan
```

Note: profile parameter is optional.

#### Starting the API locally

Command

```
sam local start-api
```

## Deployment Strategy
