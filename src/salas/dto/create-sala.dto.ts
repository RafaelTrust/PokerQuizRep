export class CreateSalaDto {
  nome: string;
  senha?: string;
  dinheiroPorJogador: number;
  responsavel_fk: string;
  limitJogadores: number;
  limitPerguntas: number;
}
