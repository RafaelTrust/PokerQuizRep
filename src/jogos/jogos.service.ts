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
import { CreateRespostaDto } from './dto/create-resposta.dto';
import {
  RespostaJogador,
  RespostaJogadorDocument,
} from './entities/respostasJogador.entity';
import { UpdateSalaJogadoresDto } from './dto/update-sala-jogadores.dto';

@Injectable()
export class JogosService {
  constructor(
    @InjectModel(Jogo.name) private jogoModel: Model<JogoDocument>,
    @InjectModel(SalaJogador.name)
    private salaJogadorModel: Model<SalaJogadorDocument>,
    @InjectModel(RespostaJogador.name)
    private respostaJogadorModel: Model<RespostaJogadorDocument>,
  ) {}

  async createJogo(createJogoDto: CreateJogoDto) {
    const jogo = await new this.jogoModel(createJogoDto);
    return jogo.save();
  }

  async createResposta(createRespostaDto: CreateRespostaDto) {
    const jogo = await new this.respostaJogadorModel(createRespostaDto);
    return jogo.save();
  }

  async createSalaJogador(createSalaJogadorDto: CreateSalaJogadoresDto) {
    let passou = true;
    let existeJogador = false;
    const jogadores = await this.salaJogadorModel
      .find({ sala_fk: createSalaJogadorDto.sala_fk })
      .exec();
    if (createSalaJogadorDto.jogador_fk === undefined) {
      for (let jogador of jogadores) {
        if (
          jogador.nickJogador === createSalaJogadorDto.nickJogador ||
          jogador.jogador_fk === createSalaJogadorDto.jogador_fk
        ) {
          passou = false;
          existeJogador =
            jogador.jogador_fk === createSalaJogadorDto.jogador_fk
              ? true
              : false;
        }
      }
    } else {
      passou = false;
    }
    if (passou) {
      const player = new this.salaJogadorModel(createSalaJogadorDto);
      return player.save();
    } else if (existeJogador) {
      return 'jogador ja esta jogando';
    } else {
      return 'nick ja existente';
    }
  }

  async findAllPlayers(idSala: string) {
    return await this.salaJogadorModel.find({ sala_fk: idSala });
  }

  async updateJogo(id: number, updateJogoDto: UpdateJogoDto) {
    return await this.jogoModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        updateJogoDto,
      },
      {
        new: false,
      },
    );
  }

  async updateJogadorSala(
    id: number,
    updateSalaJogadoresDto: UpdateSalaJogadoresDto,
  ) {
    return await this.salaJogadorModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        updateSalaJogadoresDto,
      },
      {
        new: false,
      },
    );
  }

  async removeAll(idJogo: number) {
    await this.respostaJogadorModel.deleteMany({ jogo_fk: idJogo });
    await this.salaJogadorModel.deleteMany({ jogo_fk: idJogo });
    return await this.jogoModel.deleteOne({ _id: idJogo });
  }
}
