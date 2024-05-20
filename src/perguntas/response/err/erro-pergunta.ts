import { ApiProperty } from '@nestjs/swagger';

export class ErroPergunta {
  @ApiProperty({
    description: 'Numero do erro interno',
    example: 409,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Mensagem do erro interno',
    example: 'Pergunta não encontrada.',
  })
  message: string;
}
