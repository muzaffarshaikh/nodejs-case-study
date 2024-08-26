export default interface IConfig {
  build(customerID: string): void;
  getCustomerID(): string;
}
