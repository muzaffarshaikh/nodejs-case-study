import { inject, injectable } from 'inversify';
import TYPES from '../inversify/types';
import { IEmailService } from './interfaces';

@injectable()
export default class EmailService implements IEmailService {
  private emailServiceURL!: string;

  constructor(
    @inject(TYPES.EmailServiceURL)
    emailServiceURL: string
  ) {
    this.emailServiceURL = emailServiceURL;
  }

  async sendEmail(
    subject: string,
    body: string,
    fromMail: string,
    toMail: string
  ): Promise<void> {
    try {
      // TODO: Need to implement a functionality for emailing.
    } catch (error) {
      console.error('EmailService.sendEmail() Error:', error);
      // Instead of throwing error here, a retry mechanism should be implemented to retry emails that have failed.
    }
  }
}
