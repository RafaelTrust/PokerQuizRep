import { ApiProperty } from '@nestjs/swagger';

export class LogoutResponse {
  @ApiProperty({
    description: 'Resposta ao fazer logout.',
    example: 'deslogado com sucesso',
  })
  mensagem: string;
}
