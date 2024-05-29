import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { UserEntity } from '../user/entity/user.entity';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  private readonly EMAIL_SUBJECT = 'Welcome new user!';
  private readonly EMAIL_ADDRESS = 'server@server.com';

  constructor(private readonly mailerService: MailerService) {}

  public async sendNotifyNewUserEmail(user: UserEntity): Promise<void> {
    this.logger.log(
      `Starting to send notification email to new user: '${user.email}'`,
    );
    try {
      const htmlContent = `
        <h2>Hello, ${user.name}</h2>
        <p>Welcome to server. Your email is: ${user.email}</p>
        `;

      await this.mailerService.sendMail({
        from: this.EMAIL_ADDRESS,
        to: user.email,
        subject: this.EMAIL_SUBJECT,
        html: htmlContent,
      });
      this.logger.log(`Email notification sent successfully to: '${user.email}'`);
    } catch (error) {
      this.logger.error(`Failed to send email to: '${user.email}'`, error.stack);
    }
  }
}
