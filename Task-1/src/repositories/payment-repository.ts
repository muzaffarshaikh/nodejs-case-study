import { injectable, inject } from 'inversify';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import TYPES from '../inversify/types';
import { Payment } from '../models';
import { IPaymentRepository } from './interfaces';

@injectable()
export default class PaymentRepository implements IPaymentRepository {
  private dataMapper: DataMapper;

  constructor(@inject(TYPES.DynamodbDataMapper) dataMapper: DataMapper) {
    this.dataMapper = dataMapper;
  }

  async createPayment(payment: Payment): Promise<Payment> {
    try {
      return await this.dataMapper.put(payment);
    } catch (error) {
      console.error('PaymentRepository.createPayment() Error:', error);
      throw error;
    }
  }
}
