import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsuarioDocument = Usuario & Document;

@Schema()
export class Usuario {
  @Prop()
  id: number;

  @Prop()
  nome: string;

  @Prop()
  nick: string;

  @Prop()
  email: string;

  @Prop()
  senha: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
