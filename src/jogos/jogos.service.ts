import { Injectable } from '@nestjs/common';
import { CreateJogoDto } from './dto/create-jogo.dto';
import { UpdateJogoDto } from './dto/update-jogo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Jogo, JogoDocument } from './entities/jogo.entity';
import {
  SalaJogador,
  SalaJogadorDocument,
} from './entities/salaJogador.entity';
import { Model } from 'mongoose';
import { CreateSalaJogadoresDto } from './dto/create-sala-jogadores.dto';

@Injectable()
export class JogosService {
  constructor(
    @InjectModel(Jogo.name) private jogoModel: Model<JogoDocument>,
    @InjectModel(SalaJogador.name)
    private salaJogadorModel: Model<SalaJogadorDocument>,
  ) {}

  createJogo(createJogoDto: CreateJogoDto) {
    const jogo = new this.jogoModel(createJogoDto);
    return jogo.save();
  }

  async createJogador(createSalaJogadorDto: CreateSalaJogadoresDto) {
    let passou = true;
    const jogadores = await this.salaJogadorModel.find().exec();
    if (createSalaJogadorDto.jogador_fk === undefined) {
      for (let jogador of jogadores) {
        if (jogador.nickJogador === createSalaJogadorDto.nickJogador) {
          passou = false;
        }
      }
    } else {
      passou = false;
    }
    if (passou) {
      const player = new this.salaJogadorModel(createSalaJogadorDto);
      return player.save();
    } else {
      return 'nick ja existente';
    }
  }

  findAllPlayers() {
    return this.salaJogadorModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} jogo`;
  }

  update(id: number, updateJogoDto: UpdateJogoDto) {
    return `This action updates a #${id} jogo`;
  }

  remove(id: number) {
    return `This action removes a #${id} jogo`;
  }
}
