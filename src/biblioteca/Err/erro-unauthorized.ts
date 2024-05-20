import { ApiProperty } from '@nestjs/swagger';

export class ErroUnauthorized {
  @ApiProperty({
    description: 'Numero do erro interno',
    example: 401,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Mensagem do erro interno',
    example: 'Unauthorized',
  })
  message: string;
}
