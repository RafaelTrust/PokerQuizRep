import { Module } from '@nestjs/common';
import { JogosService } from './jogos.service';
import { JogosController } from './jogos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Jogo, JogoSchema } from './entities/jogo.entity';
import { SalaJogador, SalaJogadorSchema } from './entities/salaJogador.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Jogo.name, schema: JogoSchema },
      { name: SalaJogador.name, schema: SalaJogadorSchema },
    ]),
  ],
  controllers: [JogosController],
  providers: [JogosService],
})
export class JogosModule {}
