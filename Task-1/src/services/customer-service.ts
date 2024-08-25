import { inject, injectable } from 'inversify';
import { Customer } from '../models';
import TYPES from '../inversify/types';
import { ICustomerRepository } from '../repositories/interfaces';
import { ICustomerService } from './interfaces';

@injectable()
export default class CustomerService implements ICustomerService {
  private customerRepository!: ICustomerRepository;

  constructor(
    @inject(TYPES.CustomerRepository)
    customerRepository: ICustomerRepository
  ) {
    this.customerRepository = this.customerRepository;
  }

  async updateCustomer(customer: Customer): Promise<Customer> {
    try {
      return await this.customerRepository.updateCustomer(customer);
    } catch (error) {
      console.error('CustomerService.updateCustomer() Error:', error);
      throw error;
    }
  }

  async getCustomerByID(customerID: string): Promise<Customer> {
    try {
      return await this.customerRepository.getCustomerByID(customerID);
    } catch (error) {
      console.error('CustomerService.getCustomerByID() Error:', error);
      throw error;
    }
  }
}
