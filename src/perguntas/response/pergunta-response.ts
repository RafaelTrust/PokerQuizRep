import { ApiProperty } from '@nestjs/swagger';

export class PerguntaResponse {
  @ApiProperty({
    description: 'Id da pergunta registrado no banco de dados',
    example: '663d75a07f23ac859733eae8',
  })
  _id: string;

  @ApiProperty({
    description: 'Enunciado da pergunta',
    example: 'Qual é o número da porta padrão para o protocolo HTTPS?',
  })
  enun: string;

  @ApiProperty({
    description: 'Primeira alternativa da pergunta do quiz',
    example: '443',
  })
  alternativa1: string;

  @ApiProperty({
    description: 'Segunda alternativa da pergunta do quiz',
    example: '80',
  })
  alternativa2: string;

  @ApiProperty({
    description: 'Terceira alternativa da pergunta do quiz',
    example: '8080',
  })
  alternativa3: string;

  @ApiProperty({
    description: 'Quarta alternativa da pergunta do quiz',
    example: '21',
  })
  alternativa4: string;

  @ApiProperty({
    description: 'Numero entre 1 e 4 para identificar a alternativa correta',
    example: 1,
  })
  correto: number;

  @ApiProperty({
    description: 'Tempo deixado pelo usuario para o jogador responder',
    example: 30,
  })
  timer: number;

  @ApiProperty({
    description: 'Id da sala relacionada a essa pergunta',
    example: '663d759e7f23ac859733ead8',
  })
  sala_fk: string;

  @ApiProperty({
    description: 'Numero da versão atualizada pela api',
    example: 0,
  })
  __v: number;
}
