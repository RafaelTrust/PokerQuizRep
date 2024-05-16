import { Injectable } from '@nestjs/common';
import { Recorde, RecordeDocument } from './entities/recorde.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Sala, SalaDocument } from 'src/salas/entities/sala.entity';
import { RecordeCreateDto } from './dto/recorde-create.dto';
import {
  EstatisticaCompletoCreateDto,
  EstatisticaCreateDto,
} from './dto/estatistica-create.dto';
import {
  Estatistica,
  EstatisticaDocument,
} from './entities/estatistica.entity';

@Injectable()
export class RecordeService {
  constructor(
    @InjectModel(Recorde.name) private recordeModel: Model<RecordeDocument>,
    @InjectModel(Sala.name) private salaModel: Model<SalaDocument>,
    @InjectModel(Estatistica.name)
    private estatisticaModdel: Model<EstatisticaDocument>,
  ) {}

  async createRecorde(dto: RecordeCreateDto) {
    const sala = await this.salaModel.findOne({ codSala: dto.sala_cod });
    const dataAtual = new Date();
    const recorde = await new this.recordeModel({
      sala_fk: sala._id,
      ...dto,
      data: `${dataAtual.getFullYear()}-${dataAtual.getMonth()}-${dataAtual.getDate()}`,
    });
    await recorde.save();
    return {
      recorde,
    };
  }

  async findRecordSala(cod: string) {
    const sala = await this.salaModel.findOne({ codSala: cod });
    const listaRecorde = await this.recordeModel.find({ sala_fk: sala._id });
    return {
      listaRecorde,
    };
  }

  async createEstatistica(dto: EstatisticaCompletoCreateDto) {
    const sala = await this.salaModel.findOne({
      codSala: dto.listaEstatistica[0].sala_cod,
    });
    let listaEstatistica = [];
    for (let i = 0; i < dto.listaEstatistica.length; i++) {
      let estatistica = await new this.estatisticaModdel({
        sala_fk: sala._id,
        ...dto.listaEstatistica[i],
      });
      await estatistica.save();
      listaEstatistica.push(estatistica);
    }

    return {
      listaEstatistica,
    };
  }

  async getSalaEstatistica(cod: string) {
    const sala = await this.salaModel.findOne({ codSala: cod });
    const listaEstatistica = await this.estatisticaModdel.find({
      sala_fk: sala._id,
    });
    return {
      listaEstatistica,
    };
  }
}
