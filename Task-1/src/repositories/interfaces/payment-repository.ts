import { Payment } from '../../models';

export default interface IPaymentRepository {
  /**
   * @param payment Payment object
   * @returns An instance of Payment
   */
  createPayment(payment: Payment): Promise<Payment>;
}
