import { inject, injectable } from 'inversify';
import { Invoice } from '../models';
import TYPES from '../inversify/types';
import { IInvoiceRepository } from '../repositories/interfaces';
import { IInvoiceService } from './interfaces';

@injectable()
export default class InvoiceService implements IInvoiceService {
  private invoiceRepository!: IInvoiceRepository;

  constructor(
    @inject(TYPES.InvoiceRepository)
    invoiceRepository: IInvoiceRepository
  ) {
    this.invoiceRepository = invoiceRepository;
  }

  async createInvoice(invoice: Invoice): Promise<Invoice> {
    try {
      return await this.invoiceRepository.createInvoice(invoice);
    } catch (error) {
      console.error('InvoiceService.createInvoice() Error:', error);
      throw error;
    }
  }

  async updateInvoice(invoice: Invoice): Promise<Invoice> {
    try {
      return await this.invoiceRepository.updateInvoice(invoice);
    } catch (error) {
      console.error('InvoiceService.updateInvoice() Error:', error);
      throw error;
    }
  }

  async getInvoiceByID(invoiceID: string): Promise<Invoice> {
    try {
      return await this.invoiceRepository.getInvoiceByID(invoiceID);
    } catch (error) {
      console.error('InvoiceService.getInvoiceByID() Error:', error);
      throw error;
    }
  }

  async getInvoicesByCustomerID(customerID: string): Promise<Array<Invoice>> {
    try {
      return await this.invoiceRepository.getInvoicesByCustomerID(customerID);
    } catch (error) {
      console.error('InvoiceService.getInvoicesByCustomerID() Error:', error);
      throw error;
    }
  }
}
