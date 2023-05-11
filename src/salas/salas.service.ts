import { Injectable } from '@nestjs/common';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Sala, SalaDocument } from './entities/sala.entity';
import { Model } from 'mongoose';

@Injectable()
export class SalasService {
  //constructor(@InjectModel(Sala.name) private salaModel: Model<SalaDocument>) {}

  create(createSalaDto: CreateSalaDto) {
    //const sala = new this.salaModel(createSalaDto);
    return ''; //sala.save();
  }

  findAll() {
    return ''; //this.salaModel.find();
  }

  findByPlayer(playerFk: string) {
    return ''; /*this.salaModel.find({
      responsavel_fk: playerFk,
    });*/
  }

  findOne(id: number) {
    return `This action returns a #${id} sala`;
  }

  update(id: number, updateSalaDto: UpdateSalaDto) {
    return `This action updates a #${id} sala`;
  }

  remove(id: number) {
    return `This action removes a #${id} sala`;
  }
}
