import { Injectable } from '@nestjs/common';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Sala, SalaDocument } from './entities/sala.entity';
import { Model } from 'mongoose';
import { BibliotecaService } from 'src/biblioteca/biblioteca.service';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class SalasService {
  constructor(
    @InjectModel(Sala.name) private salaModel: Model<SalaDocument>,
    private readonly bibliotecaService: BibliotecaService,
    private readonly emailService: EmailService,
  ) {}

  async create(createSalaDto: CreateSalaDto) {
    const listSalas = await this.salaModel.find().exec();
    let cod;
    let verificado = false;
    while (!verificado) {
      verificado = true;
      cod = this.bibliotecaService.generateRandomConfirmationCode;
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
    return { codigoSala: cod };
  }

  findAll() {
    return this.salaModel.find();
  }

  findByPlayer(playerFk: string) {
    return this.salaModel.find({
      responsavel_fk: playerFk,
    });
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
