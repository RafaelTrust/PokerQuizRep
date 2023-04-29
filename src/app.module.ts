import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { SalasModule } from './salas/salas.module';
import { PerguntasModule } from './perguntas/perguntas.module';
import { JogosModule } from './jogos/jogos.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://poker:FGcgTrwCL2CJz7Tn@pokerquizdata.f3duh95.mongodb.net/test',
    ),
    UsuariosModule,
    SalasModule,
    PerguntasModule,
    JogosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
