import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    if (listaRecorde) {
      return {
        listaRecorde,
      };
    } else {
      throw new HttpException(
        { statusCode: 404, message: 'Falha ao encontrar a mesa nos recordes' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async createEstatistica(dto: EstatisticaCompletoCreateDto) {
    const sala = await this.salaModel.findOne({
      codSala: dto.listaEstatistica[0].sala_cod,
    });
    let estatistica = await new this.estatisticaModdel({
      sala_fk: sala._id,
      ...dto.listaEstatistica,
    });
    await estatistica.save();

    return estatistica;
  }

  async getSalaEstatistica(cod: string) {
    const sala = await this.salaModel.findOne({ codSala: cod });
    const listaEstatistica = await this.estatisticaModdel.find({
      sala_fk: sala._id,
    });
    if (listaEstatistica) {
      return {
        listaEstatistica,
      };
    } else {
      throw new HttpException(
        {
          statusCode: 404,
          message: 'Falha ao encontrar a mesa nas estatisticas',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
