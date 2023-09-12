import { Module } from '@nestjs/common';
import { SalasService } from './salas.service';
import { SalasController } from './salas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Sala, SalaSchema } from './entities/sala.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sala.name, schema: SalaSchema }]),
  ],
  controllers: [SalasController],
  providers: [SalasService],
})
export class SalasModule {}
