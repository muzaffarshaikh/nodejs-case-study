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

This GitHub Actions workflow automates the deployment of a SAM app. The workflow is triggered whenever there is a push to the main branch of the repository. It sets up the Node.js environment, installs the necessary AWS CLI and SAM CLI tools, and then builds the SAM application using a container to ensure compatibility with the AWS Lambda runtime. The workflow deploys the application to AWS using the sam deploy command, with AWS credentials passed through GitHub Secrets.

By automating this process, the workflow ensures that any changes pushed to the main branch are consistently and reliably deployed to AWS without manual intervention. This approach uses GitHub Actions for continuous deployment by automatically handling the build and deployment steps for serverless app.

## Design Approach

## Project Structure and Design

The project is implemented as a SAM (Serverless Application Model) application running on Node.js with TypeScript. It is built using a microservices architecture, where each API is independently compiled and executed. This design follows a **Handler, Controller, Service, Repository** pattern, which ensures a smooth development process and promotes loosely coupled code.

- **Handler:** Routes requests to the appropriate controller.
- **Controller:** Manages the main processing logic.
- **Service:** Acts as a wrapper around the repository, handling complex business logic when required.
- **Repository:** Directly interacts with the database to perform CRUD operations.

This layered architecture enhances code maintainability, scalability, and testability. The project also includes configuration files like ESLint and Prettier to enforce code formatting standards. Although unit testing was set up, adding comprehensive test cases was challenging due to time constraints.

## Implementation

The following major functionalities were implemented:

1. **Create Subscription Plans:** Allows creation of subscription plans with different pricing and billing cycles.
2. **Assign Subscription Plans to Customers:** Enables assigning a specific subscription plan to a customer.
3. **PARTIAL IMPLEMENTATION: Generate Invoices:** Generates invoices at the end of each billing cycle based on the customer’s subscription plan.
4. **Record Payments:** Tracks payments made by customers and updates invoice status accordingly.
5. **Failed Payment Handling:** Implements retry logic for failed payments using an SNS/SQS pipeline.
6. **Email Notifications:** Sends email notifications to customers when an invoice is generated, when a payment is successful, or when a payment fails.

There are several areas where the code can be further optimized and improved. For detailed API documentation, please refer to the [Billing-API-Swagger.yaml](./docs/Billing-API-Swagger.yaml) docs. Note that only the core APIs have been implemented.
