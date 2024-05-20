import { ApiProperty } from '@nestjs/swagger';

export class EmailValidoResponse {
  @ApiProperty({
    description: 'Confirma se o email esta disponivel para cadastro.',
    example: false,
  })
  emailValido: boolean;
}
