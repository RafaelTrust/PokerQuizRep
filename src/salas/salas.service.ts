import { Injectable } from '@nestjs/common';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Sala, SalaDocument } from './entities/sala.entity';
import { Model } from 'mongoose';
import { BibliotecaService } from 'src/biblioteca/biblioteca.service';
import { EmailService } from 'src/email/email.service';
import {
  Pergunta,
  PerguntaDocument,
} from 'src/perguntas/entities/pergunta.entity';

@Injectable()
export class SalasService {
  constructor(
    @InjectModel(Sala.name) private salaModel: Model<SalaDocument>,
    @InjectModel(Pergunta.name) private perguntaModel: Model<PerguntaDocument>,
    private readonly bibliotecaService: BibliotecaService,
  ) {}

  async findPerguntasSala(cod: string) {
    const sala = await this.salaModel.findOne({ codSala: cod });
    const listaPerguntas = await this.perguntaModel.find({ sala_fk: sala._id });
    return {
      sala,
      listaPerguntas,
    };
  }

  async findSalasPublicas() {
    const mesas = await this.salaModel.find({ publico: true });
    console.log(mesas.toString());
    return {
      mesas,
    };
  }

  async create(createSalaDto: CreateSalaDto) {
    const listSalas = await this.salaModel.find().exec();
    let cod;
    let verificado = false;
    while (!verificado) {
      verificado = true;
      cod = this.bibliotecaService.generateRandomConfirmationCode(6);
      for (let room of listSalas) {
        if (room.codSala === cod) {
          verificado = false;
        }
      }
    }
    const sala = await new this.salaModel({
      ...createSalaDto,
      codSala: cod,
    });
    await sala.save();
    let mesas = await this.salaModel.find({
      responsavel_fk: sala.responsavel_fk,
    });
    return {
      mesas,
    };
  }

  async findByPlayer(playerFk: string) {
    let mesas = await this.salaModel.find({
      responsavel_fk: playerFk,
    });
    return {
      mesas,
    };
  }

  async findOne(cod: string) {
    return await this.salaModel.findOne({ codSala: cod });
  }

  async update(id: string, updateSalaDto: UpdateSalaDto) {
    let sala = await this.salaModel.findById({ _id: id });
    sala = Object.assign(sala, updateSalaDto);
    return await sala.save();
  }

  async remove(id: string) {
    let mesa = await this.salaModel.findOne({ _id: id }).exec();
    await this.perguntaModel.deleteMany({ sala_fk: id }).exec();
    await this.salaModel.deleteOne({ _id: id }).exec();
    let mesas = await this.salaModel.find({
      responsavel_fk: mesa.responsavel_fk,
    });
    return {
      mesas,
    };
  }
}
