import { Module } from '@nestjs/common';
import { BibliotecaService } from './biblioteca.service';

@Module({
  providers: [BibliotecaService],
  exports: [BibliotecaService],
})
export class BibliotecaModule {}
