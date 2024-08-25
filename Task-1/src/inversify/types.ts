const TYPES = {
  CreateSubscriptionPlanController: Symbol.for(
    'CreateSubscriptionPlanController'
  ),
  CreateSubscriptionPlanConfig: Symbol.for('CreateSubscriptionPlanConfig'),
  CreateSubscriptionPlanResult: Symbol.for('CreateSubscriptionPlanResult'),

  SubscriptionPlanService: Symbol.for('SubscriptionPlanService'),
  SubscriptionPlanRepository: Symbol.for('SubscriptionPlanRepository'),

  DBURL: Symbol.for('DBURL'),
  DynamodbDataMapper: Symbol.for('DynamodbDataMapper'),
  AWSRegion: Symbol.for('AWSRegion'),
  SNSService: Symbol.for('SNSService'),
  AWSSNS: Symbol.for('AWSSNS'),
};

export default TYPES;
