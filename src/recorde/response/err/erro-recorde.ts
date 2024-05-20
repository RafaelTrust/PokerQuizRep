import { ApiProperty } from '@nestjs/swagger';

export class ErroRecorde {
  @ApiProperty({
    description: 'Numero do erro interno',
    example: 404,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Mensagem do erro interno',
    example: 'Falha ao encontrar a mesa nos recordes',
  })
  message: string;
}
