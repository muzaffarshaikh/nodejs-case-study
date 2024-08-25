const TYPES = {
  CreateSubscriptionPlanController: Symbol.for(
    'CreateSubscriptionPlanController'
  ),
  CreateSubscriptionPlanConfig: Symbol.for('CreateSubscriptionPlanConfig'),
  CreateSubscriptionPlanResult: Symbol.for('CreateSubscriptionPlanResult'),

  AssignSubscriptionPlanController: Symbol.for(
    'AssignSubscriptionPlanController'
  ),
  AssignSubscriptionPlanConfig: Symbol.for('AssignSubscriptionPlanConfig'),
  AssignSubscriptionPlanResult: Symbol.for('AssignSubscriptionPlanResult'),

  SubscriptionPlanService: Symbol.for('SubscriptionPlanService'),
  SubscriptionPlanRepository: Symbol.for('SubscriptionPlanRepository'),

  CustomerService: Symbol.for('CustomerService'),
  CustomerRepository: Symbol.for('CustomerRepository'),

  DBURL: Symbol.for('DBURL'),
  DynamodbDataMapper: Symbol.for('DynamodbDataMapper'),
  AWSRegion: Symbol.for('AWSRegion'),
  SNSService: Symbol.for('SNSService'),
  AWSSNS: Symbol.for('AWSSNS'),
};

export default TYPES;
