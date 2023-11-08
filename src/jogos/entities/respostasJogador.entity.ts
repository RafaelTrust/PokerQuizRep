import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RespostaJogadorDocument = RespostaJogador & Document;

@Schema()
export class RespostaJogador {
  @Prop()
  sala_jogador_fk: string;

  @Prop()
  pergunta_fk: string;

  @Prop()
  timer: string;

  @Prop()
  alternativa: string;

  @Prop()
  jogo_fk: string;
}

export const RespostaJogadorSchema =
  SchemaFactory.createForClass(RespostaJogador);
