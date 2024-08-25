import { injectable, inject } from 'inversify';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import TYPES from '../inversify/types';
import { Customer } from '../models';
import { ICustomerRepository } from './interfaces';

@injectable()
export default class CustomerRepository implements ICustomerRepository {
  private dataMapper: DataMapper;

  constructor(@inject(TYPES.DynamodbDataMapper) dataMapper: DataMapper) {
    this.dataMapper = dataMapper;
  }

  async updateCustomer(customer: Customer): Promise<Customer> {
    try {
      return await this.dataMapper.update(customer);
    } catch (error) {
      console.error('CustomerRepository.createCustomer() Error:', error);
      throw error;
    }
  }

  async getCustomerByID(customerID: string): Promise<Customer> {
    try {
      const customer = new Customer();
      customer.setID(customerID);
      return await this.dataMapper.get(customer);
    } catch (error) {
      console.error('CustomerRepository.getCustomerByID() Error:', error);
      throw error;
    }
  }
}
