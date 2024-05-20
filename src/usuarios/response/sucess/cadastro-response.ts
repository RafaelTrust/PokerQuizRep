import { ApiProperty } from '@nestjs/swagger';

export class CadastroResponse {
  @ApiProperty({
    description:
      'Codigo de validação enviado para o email para validar o novo usuario.',
    example: '013284',
  })
  codValido: string;
}
