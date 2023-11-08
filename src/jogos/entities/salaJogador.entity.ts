import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SalaJogadorDocument = SalaJogador & Document;

@Schema()
export class SalaJogador {
  @Prop()
  sala_fk: string;

  @Prop()
  jogador_fk?: string;

  @Prop()
  nickJogador: string;

  @Prop()
  dinheiro: number;

  @Prop()
  decisao: string;

  @Prop()
  jogo_fk: string;
}

export const SalaJogadorSchema = SchemaFactory.createForClass(SalaJogador);
