import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JogoDocument = Jogo & Document;

@Schema()
export class Jogo {
  @Prop()
  rodada: number;

  @Prop()
  vencedor: string;
}

export const JogoSchema = SchemaFactory.createForClass(Jogo);
