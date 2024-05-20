import { ApiProperty } from '@nestjs/swagger';

export class ErroCodigo {
  @ApiProperty({
    description: 'Numero do erro interno',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Mensagem do erro interno',
    example: 'Codigo Invalido',
  })
  message: string;
}
