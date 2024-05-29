import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';
import { resolve } from 'node:path';

@Module({
  imports: [MailerModule.forRootAsync(getMailerOptions())],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}

export function getMailerOptions(): MailerAsyncOptions {
  return {
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
      return {
        transport: {
          host: configService.get<string>('EMAIL_SMTP_HOST'),
          port: configService.get<number>('EMAIL_SMTP_PORT'),
          secure: false,
          auth: {
            user: configService.get<string>('EMAIL_USER_NAME'),
            pass: configService.get<string>('EMAIL_USER_PASSWORD'),
          },
          from: configService.get<string>('EMAIL_FROM'),
        },
        template: {
          dir: resolve(__dirname, 'assets'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      };
    },
    inject: [ConfigService],
  };
}
