import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { SalasModule } from './salas/salas.module';
import { PerguntasModule } from './perguntas/perguntas.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { BibliotecaModule } from './biblioteca/biblioteca.module';
import { RecordeModule } from './recorde/recorde.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.BD_URL),
    UsuariosModule,
    SalasModule,
    PerguntasModule,
    AuthModule,
    EmailModule,
    BibliotecaModule,
    RecordeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
