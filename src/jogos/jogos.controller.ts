import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JogosService } from './jogos.service';
import { CreateJogoDto } from './dto/create-jogo.dto';
import { UpdateJogoDto } from './dto/update-jogo.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateRespostaDto } from './dto/create-resposta.dto';
import { CreateSalaJogadoresDto } from './dto/create-sala-jogadores.dto';
import { UpdateSalaJogadoresDto } from './dto/update-sala-jogadores.dto';

@Controller('jogar')
@UseGuards(AuthGuard('jwt'))
export class JogosController {
  constructor(private readonly jogosService: JogosService) {}

  @Post('jogo/registro')
  createJogo(@Body() createJogoDto: CreateJogoDto) {
    return this.jogosService.createJogo(createJogoDto);
  }

  @Post('resposta-jogador/registro')
  createResposta(@Body() createRespostaDto: CreateRespostaDto) {
    return this.jogosService.createResposta(createRespostaDto);
  }

  @Post('jogador-sala/registro')
  createSalaJogador(@Body() createSalaJogadorDto: CreateSalaJogadoresDto) {
    return this.jogosService.createSalaJogador(createSalaJogadorDto);
  }

  @Get('jogo/todos-jogadores/:idSala')
  findAllPlayers(@Param('idSala') idSala: string) {
    return this.jogosService.findAllPlayers(idSala);
  }

  @Patch('jogo/:id')
  updateJogo(@Param('id') id: string, @Body() updateJogoDto: UpdateJogoDto) {
    return this.jogosService.updateJogo(+id, updateJogoDto);
  }

  @Patch('jogador/:id')
  updateJogadorSala(
    @Param('id') id: string,
    @Body() updateSalaJogadoresDto: UpdateSalaJogadoresDto,
  ) {
    return this.jogosService.updateJogadorSala(+id, updateSalaJogadoresDto);
  }

  @Delete('jogo/:idJogo')
  removeAll(@Param('idJogo') idJogo: string) {
    return this.jogosService.removeAll(+idJogo);
  }
}
