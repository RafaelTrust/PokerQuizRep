import { ApiProperty } from '@nestjs/swagger';

export class UpdateSalaDto {
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
    description: 'Deixa visivel para todos os jogadores ou não.',
    example: true,
  })
  publico: Boolean;
}
