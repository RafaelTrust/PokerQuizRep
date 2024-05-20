import { ApiProperty } from '@nestjs/swagger';

export class NickValidoResponse {
  @ApiProperty({
    description: 'Confirma se o nick esta disponivel para cadastro.',
    example: false,
  })
  nickValido: boolean;
}
