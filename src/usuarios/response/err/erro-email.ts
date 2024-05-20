import { ApiProperty } from '@nestjs/swagger';

export class ErroEmail {
  @ApiProperty({
    description: 'Numero do erro interno',
    example: 404,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Mensagem do erro interno',
    example: 'Falha ao encontrar email',
  })
  message: string;
}
