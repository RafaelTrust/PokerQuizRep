import { Module } from '@nestjs/common';
import { PerguntasService } from './perguntas.service';
import { PerguntasController } from './perguntas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pergunta, PerguntaSchema } from './entities/pergunta.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pergunta.name, schema: PerguntaSchema },
    ]),
  ],
  controllers: [PerguntasController],
  providers: [PerguntasService],
})
export class PerguntasModule {}
