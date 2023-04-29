export class CreateSalaDto {
  nome: string;
  senha?: string;
  dinheiroTotal: number;
  responsavel_fk: number;
  limitJogadores: number;
  limitPerguntas: number;
  powerUps: string;
}
