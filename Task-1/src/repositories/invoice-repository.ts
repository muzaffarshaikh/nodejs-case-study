import { injectable, inject } from 'inversify';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import TYPES from '../inversify/types';
import { Invoice } from '../models';
import { IInvoiceRepository } from './interfaces';
import CustomError from '../utils/custom-error';

enum ErrorCode {
  NOT_FOUND = 'error.billing-api.repository.invoice-repository.item-not-found',
}

@injectable()
export default class InvoiceRepository implements IInvoiceRepository {
  private dataMapper: DataMapper;

  constructor(@inject(TYPES.DynamodbDataMapper) dataMapper: DataMapper) {
    this.dataMapper = dataMapper;
  }

  async updateInvoice(invoice: Invoice): Promise<Invoice> {
    try {
      return await this.dataMapper.update(invoice);
    } catch (error) {
      console.error('InvoiceRepository.updateInvoice() Error:', error);
      throw error;
    }
  }

  async createInvoice(invoice: Invoice): Promise<Invoice> {
    try {
      return await this.dataMapper.put(invoice);
    } catch (error) {
      console.error('InvoiceRepository.createInvoice() Error:', error);
      throw error;
    }
  }

  async getInvoiceByID(invoiceID: string): Promise<Invoice> {
    try {
      const invoice = new Invoice();
      invoice.setID(invoiceID);
      return await this.dataMapper.get(invoice);
    } catch (error: any) {
      // any should not be used in TS, time constraints have forced me to use.
      if (error.message === 'ItemNotFoundException') {
        throw new CustomError(ErrorCode.NOT_FOUND, 'Invoice not found');
      }
      console.error('InvoiceRepository.getInvoiceByID() Error:', error);
      throw error;
    }
  }
}
