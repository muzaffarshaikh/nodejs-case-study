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

  ProcessPaymentController: Symbol.for('AssignSubscriptionPlanController'),
  ProcessPaymentConfig: Symbol.for('ProcessPaymentControllerConfig'),
  ProcessPaymentResult: Symbol.for('ProcessPaymentControllerResult'),

  GenerateInvoicesController: Symbol.for('GenerateInvoicesController'),
  GenerateInvoicesResult: Symbol.for('GenerateInvoicesResult'),

  GenerateInvoiceController: Symbol.for('GenerateInvoiceController'),
  GenerateInvoiceResult: Symbol.for('GenerateInvoiceResult'),

  SubscriptionPlanService: Symbol.for('SubscriptionPlanService'),
  SubscriptionPlanRepository: Symbol.for('SubscriptionPlanRepository'),

  CustomerService: Symbol.for('CustomerService'),
  CustomerRepository: Symbol.for('CustomerRepository'),

  InvoiceService: Symbol.for('InvoiceService'),
  InvoiceRepository: Symbol.for('InvoiceRepository'),

  PaymentService: Symbol.for('PaymentService'),
  PaymentRepository: Symbol.for('PaymentRepository'),

  EmailService: Symbol.for('EmailService'),
  EmailServiceURL: Symbol.for('EmailServiceURL'),

  DBURL: Symbol.for('DBURL'),
  DynamodbDataMapper: Symbol.for('DynamodbDataMapper'),
  AWSRegion: Symbol.for('AWSRegion'),
  SNSService: Symbol.for('SNSService'),
  AWSSNS: Symbol.for('AWSSNS'),
};

export default TYPES;
