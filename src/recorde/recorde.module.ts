import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Recorde, RecordeSchema } from './entities/recorde.entity';
import { Sala, SalaSchema } from 'src/salas/entities/sala.entity';
import { RecordeController } from './recorde.controller';
import { RecordeService } from './recorde.service';
import { Estatistica, EstatisticaSchema } from './entities/estatistica.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Recorde.name, schema: RecordeSchema },
      { name: Sala.name, schema: SalaSchema },
      { name: Estatistica.name, schema: EstatisticaSchema },
    ]),
  ],
  controllers: [RecordeController],
  providers: [RecordeService],
})
export class RecordeModule {}
