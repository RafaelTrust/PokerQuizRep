import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PerguntaDocument = Pergunta & Document;

@Schema()
export class Pergunta {
  @Prop()
  enun: string;

  @Prop()
  alternativa1: string;

  @Prop()
  alternativa2: string;

  @Prop()
  alternativa3: string;

  @Prop()
  alternativa4: string;

  @Prop()
  correto: number;

  @Prop()
  timer: number;

  @Prop()
  sala_fk: string;
}

export const PerguntaSchema = SchemaFactory.createForClass(Pergunta);
