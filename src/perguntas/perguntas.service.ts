import { Injectable } from '@nestjs/common';
import { CreatePerguntaDto } from './dto/create-pergunta.dto';
import { UpdatePerguntaDto } from './dto/update-pergunta.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pergunta, PerguntaDocument } from './entities/pergunta.entity';
import { Model } from 'mongoose';

@Injectable()
export class PerguntasService {
  constructor(
    @InjectModel(Pergunta.name) private porguntaModel: Model<PerguntaDocument>,
  ) {}

  async create(createPerguntaDto: CreatePerguntaDto) {
    const pergunta = await new this.porguntaModel(createPerguntaDto);
    await pergunta.save();
    let listaPerguntas = await this.porguntaModel.find({
      sala_fk: pergunta.sala_fk,
    });
    return {
      listaPerguntas,
    };
  }

  findAll() {
    return this.porguntaModel.find();
  }

  async findBySala(sala_fk: string) {
    let listaPerguntas = await this.porguntaModel.find({ sala_fk });
    return {
      listaPerguntas,
    };
  }

  async findOne(id: string) {
    return await this.porguntaModel.findById(id);
  }

  async update(id: string, updatePerguntaDto: UpdatePerguntaDto) {
    let pergunta = await this.porguntaModel.findOne({ _id: id });
    pergunta = Object.assign(pergunta, updatePerguntaDto);
    return pergunta.save();
  }

  async remove(id: string) {
    let pergunta = await this.porguntaModel.findOne({ _id: id }).exec();
    let sala_fk = pergunta.sala_fk;
    await this.porguntaModel.deleteOne({ _id: id }).exec();
    let listaPerguntas = await this.porguntaModel.find({ sala_fk });
    return {
      listaPerguntas,
    };
  }
}
