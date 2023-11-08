import { Module } from '@nestjs/common';
import { JogosService } from './jogos.service';
import { JogosController } from './jogos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Jogo, JogoSchema } from './entities/jogo.entity';
import { SalaJogador, SalaJogadorSchema } from './entities/salaJogador.entity';
import { JwtModule } from '@nestjs/jwt';
import {
  RespostaJogador,
  RespostaJogadorSchema,
} from './entities/respostasJogador.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Jogo.name, schema: JogoSchema },
      { name: SalaJogador.name, schema: SalaJogadorSchema },
      { name: RespostaJogador.name, schema: RespostaJogadorSchema },
    ]),
    JwtModule.register({
      privateKey: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [JogosController],
  providers: [JogosService],
})
export class JogosModule {}
