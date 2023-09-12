import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SalaDocument = Sala & Document;

@Schema()
export class Sala {
  @Prop()
  nome: string;

  @Prop()
  senha: string;

  @Prop()
  dinheiroTotal: number;

  @Prop()
  responsavel_fk: string;

  @Prop()
  limitJogadores: number;

  @Prop()
  limitPerguntas: number;

  @Prop()
  powerUps: string;
}

export const SalaSchema = SchemaFactory.createForClass(Sala);
