import { Module } from '@nestjs/common';
import { JogosService } from './jogos.service';
import { JogosController } from './jogos.controller';

@Module({
  controllers: [JogosController],
  providers: [JogosService]
})
export class JogosModule {}
