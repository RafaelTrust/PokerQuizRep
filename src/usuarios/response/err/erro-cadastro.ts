import { ApiProperty } from '@nestjs/swagger';

export class ErroCadastro {
  @ApiProperty({
    description: 'Numero do erro interno',
    example: 409,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Mensagem do erro interno',
    example: 'Nick ou Email ja existente',
  })
  message: string;
}
