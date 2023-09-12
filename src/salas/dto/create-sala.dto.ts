export class CreateSalaDto {
  nome: string;
  senha?: string;
  dinheiroTotal: number;
  responsavel_fk: string;
  limitJogadores: number;
  limitPerguntas: number;
  powerUps: string;
}
