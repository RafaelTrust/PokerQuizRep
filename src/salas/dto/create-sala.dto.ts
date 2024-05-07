export class CreateSalaDto {
  nome: string;
  responsavel_fk: string;
  tema: string;
  limitPerguntas: number;
  publico: Boolean;
  online: Boolean;
}
