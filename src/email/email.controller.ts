import { Controller, Get } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get('teste')
  async enviarEmail() {
    try {
      await this.emailService.sendEmail(
        'rafaeltrust@outlook.com',
        'Testando',
        'sadas',
      );
      return 'Email enviado com sucesso';
    } catch (error) {
      throw 'Erro ao enviar o email';
    }
  }
}
