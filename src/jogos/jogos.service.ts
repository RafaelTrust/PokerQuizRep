import { Injectable } from '@nestjs/common';
import { CreateJogoDto } from './dto/create-jogo.dto';
import { UpdateJogoDto } from './dto/update-jogo.dto';

@Injectable()
export class JogosService {
  create(createJogoDto: CreateJogoDto) {
    return 'This action adds a new jogo';
  }

  findAll() {
    return `This action returns all jogos`;
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
