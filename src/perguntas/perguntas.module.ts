import { Module } from '@nestjs/common';
import { PerguntasService } from './perguntas.service';
import { PerguntasController } from './perguntas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pergunta, PerguntaSchema } from './entities/pergunta.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pergunta.name, schema: PerguntaSchema },
    ]),
    JwtModule.register({
      privateKey: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [PerguntasController],
  providers: [PerguntasService],
})
export class PerguntasModule {}
