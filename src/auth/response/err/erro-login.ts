import { ApiProperty } from '@nestjs/swagger';

export class ErroLogin {
  @ApiProperty({
    description: 'Numero do erro interno',
    example: 401,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Mensagem do erro interno',
    example: 'Email ou Senha Invalidos',
  })
  message: string;
}
