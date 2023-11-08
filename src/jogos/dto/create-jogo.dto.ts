export class CreateJogoDto {
  rodada: number;
  pergunta_fk?: string;
  montante: number;
  apostaMinima: number;
  vencedor: string;
}
