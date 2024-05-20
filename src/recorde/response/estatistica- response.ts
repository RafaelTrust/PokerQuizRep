import { ApiProperty } from '@nestjs/swagger';

export class EstatisticaResponse {
  @ApiProperty({
    description:
      'Id do registro da resposta do player online para uma das perguntas.',
    example: '663d64618d3b80c1099d21e7',
  })
  _id: string;

  @ApiProperty({
    description: 'Id da sala de onde veio a resposta da pergunta.',
    example: '6639df493b839867aac57529',
  })
  sala_fk: string;

  @ApiProperty({
    description: 'Id da pergunta que foi respondida',
    example: '6639df493b839867aac57535',
  })
  pergunta_fk: string;

  @ApiProperty({
    description: 'Registra qual alternativa foi marcado pelo usuario.',
    example: 1,
  })
  alternativa: number;

  @ApiProperty({
    description: 'Registra qual é a alternativa correta.',
    example: 3,
  })
  correto: number;

  @ApiProperty({
    description: 'Numero da versão atualizada pela api',
    example: 0,
  })
  __v: number;
}
