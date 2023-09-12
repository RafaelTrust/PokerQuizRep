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

  create(createPerguntaDto: CreatePerguntaDto) {
    const pergunta = new this.porguntaModel(createPerguntaDto);
    return pergunta.save();
  }

  findAll() {
    return this.porguntaModel.find();
  }

  findBySala(salaFk: string) {
    return this.porguntaModel.find({
      sala_fk: salaFk,
    });
  }

  findOne(id: string) {
    return this.porguntaModel.findById(id);
  }

  update(id: string, updatePerguntaDto: UpdatePerguntaDto) {
    return this.porguntaModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        updatePerguntaDto,
      },
      {
        new: true,
      },
    );
  }

  remove(id: string) {
    return this.porguntaModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }
}
