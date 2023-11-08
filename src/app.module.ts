import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { SalasModule } from './salas/salas.module';
import { PerguntasModule } from './perguntas/perguntas.module';
import { JogosModule } from './jogos/jogos.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { BibliotecaModule } from './biblioteca/biblioteca.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.BD_URL),
    UsuariosModule,
    SalasModule,
    PerguntasModule,
    JogosModule,
    AuthModule,
    EmailModule,
    BibliotecaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
