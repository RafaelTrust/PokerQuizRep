import { ApiProperty } from '@nestjs/swagger';

export class ErroInterno {
  @ApiProperty({
    description: 'Numero do erro interno',
    example: 500,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Mensagem do erro interno',
    example: 'Internal server error',
  })
  message: string;
}
