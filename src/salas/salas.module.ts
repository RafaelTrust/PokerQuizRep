import { Module } from '@nestjs/common';
import { SalasService } from './salas.service';
import { SalasController } from './salas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Sala, SalaSchema } from './entities/sala.entity';
import { JwtModule } from '@nestjs/jwt';
import { BibliotecaModule } from 'src/biblioteca/biblioteca.module';
import { EmailModule } from 'src/email/email.module';
import {
  Pergunta,
  PerguntaSchema,
} from 'src/perguntas/entities/pergunta.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Sala.name, schema: SalaSchema },
      { name: Pergunta.name, schema: PerguntaSchema },
    ]),
    JwtModule.register({
      privateKey: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
    BibliotecaModule,
    EmailModule,
  ],
  controllers: [SalasController],
  providers: [SalasService],
})
export class SalasModule {}
