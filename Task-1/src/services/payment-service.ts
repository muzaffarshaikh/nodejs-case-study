import { inject, injectable } from 'inversify';
import { Payment } from '../models';
import TYPES from '../inversify/types';
import { IPaymentRepository } from '../repositories/interfaces';
import { IPaymentService } from './interfaces';

@injectable()
export default class PaymentService implements IPaymentService {
  private paymentRepository!: IPaymentRepository;

  constructor(
    @inject(TYPES.PaymentRepository)
    paymentRepository: IPaymentRepository
  ) {
    this.paymentRepository = paymentRepository;
  }

  async createPayment(invoice: Payment): Promise<Payment> {
    try {
      return await this.paymentRepository.createPayment(invoice);
    } catch (error) {
      console.error('PaymentService.createPayment() Error:', error);
      throw error;
    }
  }
}
