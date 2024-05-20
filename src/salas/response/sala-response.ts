import { ApiProperty } from '@nestjs/swagger';

export class SalaResponse {
  @ApiProperty({
    description: 'Id da sala criada',
    example: '6636d1eed0607d8c3cae7cbe',
  })
  _id: string;

  @ApiProperty({
    description: 'Nome da mesa para os usuarios se lembrarem dela apenas.',
    example: 'Turma XYZ',
  })
  nome: string;

  @ApiProperty({
    description: 'Id do usuario que criou a mesa para ser jogada.',
    example: '663de96267b9531920a75b14',
  })
  responsavel_fk: string;

  @ApiProperty({
    description:
      'Tema da mesa que se basea nela para gerar as perguntas por IA.',
    example: 'Segunda Guerra Mundial',
  })
  tema: string;

  @ApiProperty({
    description:
      'Limite de perguntas jogadas dentro do jogo, mas pode ter mais perguntas para serem sorteadas em cada jogo baseado no limite estipulado.',
    example: 10,
  })
  limitPerguntas: number;

  @ApiProperty({
    description:
      'Codigo da mesa para poder ser encontrada por qualquer usuario.',
    example: 'LELHiO',
  })
  @ApiProperty({
    description: 'Deixa visivel para todos os jogadores ou não.',
    example: true,
  })
  publico: Boolean;

  @ApiProperty({
    description: 'Numero da versão atualizada pela api',
    example: 0,
  })
  __v: number;
}
