export class CreateSalaJogadoresDto {
  sala_fk: number;
  jogador_fk?: number;
  nickJogador?: string;
  dinheiro: number;
  powerUps: string;
  jogo_fk: number;
}
