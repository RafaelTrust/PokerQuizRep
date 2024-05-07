export class EstatisticaCompletoCreateDto {
  listaEstatistica: EstatisticaCreateDto[];
}

export class EstatisticaCreateDto {
  sala_cod: string;
  pergunta_fk: string;
  alternativa: number;
  correto: number;
}
