import { ApiProperty } from '@nestjs/swagger';

export class EmailResponse {
  @ApiProperty({
    description: 'Resposta da api ao enviar o email.',
    example: 'Email enviado com sucesso.',
  })
  resposta: string;
}
