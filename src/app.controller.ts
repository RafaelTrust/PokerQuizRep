import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ErroInterno } from './biblioteca/biblioteca.service';

@ApiTags('Padrão')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('teste')
  @ApiOperation({
    summary: 'Testa retorno da api',
  })
  @ApiOkResponse({
    description: 'Retorno online da api. Retorna a string "Hello World!"',
  })
  @ApiResponse({
    status: 500,
    type: ErroInterno,
    description: 'Erro interno do servidor não disponível para o usuario.',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
