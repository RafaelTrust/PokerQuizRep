import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EstatisticaDocument = Estatistica & Document;

@Schema()
export class Estatistica {
  @Prop()
  sala_fk: string;

  @Prop()
  pergunta_fk: string;

  @Prop()
  alternativa: number;

  @Prop()
  correto: number;
}

export const EstatisticaSchema = SchemaFactory.createForClass(Estatistica);
