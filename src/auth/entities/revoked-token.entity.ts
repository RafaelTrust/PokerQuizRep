import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RevokedTokenDocument = RevokedToken & Document;

@Schema()
export class RevokedToken extends Document {
  @Prop({ required: true, unique: true })
  token: string;
}

export const RevokedTokenModel = SchemaFactory.createForClass(RevokedToken);
