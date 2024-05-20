import { Controller, Get, Param } from '@nestjs/common';
import { EmailService } from './email.service';
import { ApiOkResponse, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmailResponse } from './response/email-response';
import { ErroInterno } from 'src/Err/erro-interno';

@ApiTags('Email')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  /**
   * Envia um email para o email selecionado como teste interno
   */
  @Get('teste/:email')
  @ApiOkResponse({
    type: EmailResponse,
    description: 'Email enviado com sucesso.',
  })
  @ApiResponse({
    status: 500,
    type: ErroInterno,
    description: 'Erro interno do servidor não disponível para o usuario.',
  })
  @ApiParam({
    name: 'email',
    description: 'Email selecionado para testar os envios de email da API.',
    example: 'rafaelimaferreira@gmail.com',
  })
  async enviarEmail(@Param('email') email: string) {
    try {
      await this.emailService.sendEmail(
        email,
        'Testando',
        'Este é um email teste',
      );
      const resposta = 'Email enviado com sucesso.';
      return resposta;
    } catch (error) {
      throw 'Erro ao enviar o email';
    }
  }
}
