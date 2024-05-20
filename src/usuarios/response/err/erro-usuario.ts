import { ApiProperty } from '@nestjs/swagger';

export class ErroUsuario {
  @ApiProperty({
    description: 'Numero do erro interno',
    example: 404,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Mensagem do erro interno',
    example: 'Falha ao encontrar o usuario',
  })
  message: string;
}
