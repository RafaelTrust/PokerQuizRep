import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(to: string, subject: string, text: string) {
    try {
      await this.mailerService.sendMail({
        from: 'Poker Quiz <pokerquiz.mailer@gmail.com>',
        to,
        subject,
        text,
      });

      console.log('Email enviado com sucesso');
    } catch (error) {
      console.error('Erro ao enviar o Email ', error);
      throw error;
    }
  }
}
