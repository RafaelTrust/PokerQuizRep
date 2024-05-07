import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RecordeDocument = Recorde & Document;

@Schema()
export class Recorde {
  @Prop()
  sala_fk: string;

  @Prop()
  player_fk?: string;

  @Prop()
  nick: string;

  @Prop()
  logado: Boolean;

  @Prop()
  valor: number;

  @Prop()
  pcent_acertos: number;

  @Prop()
  data: string;
}

export const RecordeSchema = SchemaFactory.createForClass(Recorde);
