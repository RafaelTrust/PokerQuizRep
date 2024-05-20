import { ApiProperty } from '@nestjs/swagger';

export class ErroListaPergunta {
  @ApiProperty({
    description: 'Numero do erro interno',
    example: 409,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Mensagem do erro interno',
    example: 'Perguntas não encontradas pela mesa.',
  })
  message: string;
}
