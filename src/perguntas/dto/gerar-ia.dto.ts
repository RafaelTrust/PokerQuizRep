import { ApiProperty } from '@nestjs/swagger';

export class GerarIADto {
  @ApiProperty({
    description: 'Tema de perguntas que será gerado pela IA.',
    example: 'Segunda Guerra Mundial',
  })
  tema: string;

  @ApiProperty({
    description: 'Lista de perguntas em JSON que ja foram feitas.',
    example: '',
  })
  jsonPerguntas: string;
}
