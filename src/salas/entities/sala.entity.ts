import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SalaDocument = Sala & Document;

@Schema()
export class Sala {
  @Prop()
  nome: string;

  @Prop()
  tema: string;

  @Prop()
  responsavel_fk: string;

  @Prop()
  limitPerguntas: number;

  @Prop()
  codSala: string;

  @Prop()
  publico: Boolean;
}

export const SalaSchema = SchemaFactory.createForClass(Sala);
