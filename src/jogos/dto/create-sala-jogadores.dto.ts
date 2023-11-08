export class CreateSalaJogadoresDto {
  sala_fk: number;
  jogador_fk?: string;
  nickJogador: string;
  dinheiro: number;
  decisao: string;
  jogo_fk: number;
}
