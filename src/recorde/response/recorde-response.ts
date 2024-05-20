import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RecordeResponse {
  @ApiProperty({
    description:
      'Id da registro da pontuação e percentual de acertos de um usuario em um jogo.',
    example: '663e3077cf2d4177f5efb801',
  })
  _id: string;

  @ApiProperty({
    description: 'Id da sala a qual o recorde se referencia',
    example: '6636e2d0d0607d8c3cae7cff',
  })
  sala_fk: string;

  @ApiPropertyOptional({
    description:
      'Id do jogador que fez a pontuação na sala, podendo não ter por considerar que mesmo jogadores sem estarem logados podem criar registro nos recordes da mesa podendo ser filtrada pela mesma.',
    example: '663d743e7f23ac859733eac0',
  })
  player_fk?: string;

  @ApiProperty({
    description: 'Nick do jogador podendo ter uma conta ou não',
    example: 'RafaelTrust',
  })
  nick: string;

  @ApiProperty({
    description: 'Verifica se o registro foi feito por uma conta logada ou não',
    example: true,
  })
  logado: Boolean;

  @ApiProperty({
    description: 'Registra o valor da pontuação do jogo',
    example: 9024.790039062,
  })
  valor: number;

  @ApiProperty({
    description:
      'Registra o numero do percentual de acertos baseado na quantidade de perguntas disponiveis para serem jogados no jogo. Ver limitPerguntas na mesa referente.',
    example: 60,
  })
  pcent_acertos: number;

  @ApiProperty({
    description: 'Registra a data e hora em que o recorde foi cadastrado.',
    example: '2024-4-10',
  })
  data: string;

  @ApiProperty({
    description: 'Numero da versão atualizada pela api',
    example: 0,
  })
  __v: number;
}
