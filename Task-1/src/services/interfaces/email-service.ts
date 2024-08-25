export default interface ISubscriptionPlanService {
  sendEmail(
    subject: string,
    body: string,
    fromMail: string,
    toMail: string
  ): Promise<void>;
}
