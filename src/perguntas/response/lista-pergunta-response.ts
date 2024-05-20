import { ApiProperty } from '@nestjs/swagger';
import { PerguntaResponse } from './pergunta-response';

export class ListaPerguntaResponse {
  @ApiProperty({
    description: 'Lista de perguntas referente a uma sala.',
    example: [
      {
        _id: '6636d1eed0607d8c3cae7cc6',
        enun: 'Quando ocorreu o Dia D durante a Segunda Guerra Mundial?',
        alternativa1: '6 de junho de 1944',
        alternativa2: '15 de agosto de 1945',
        alternativa3: '1º de setembro de 1939',
        alternativa4: '12 de dezembro de 1941',
        correto: 1,
        timer: 30,
        sala_fk: '6636d1eed0607d8c3cae7cbe',
        __v: 0,
      },
      {
        _id: '6636d1eed0607d8c3cae7cca',
        enun: 'Em que data ocorreu o ataque surpresa japonês a base militar de Pearl Harbor?',
        alternativa1: '7 de dezembro de 1941',
        alternativa2: '6 de junho de 1944',
        alternativa3: '1 de setembro de 1939',
        alternativa4: '11 de setembro de 2001',
        correto: 1,
        timer: 30,
        sala_fk: '6636d1eed0607d8c3cae7cbe',
        __v: 0,
      },
      {
        _id: '6636d1eed0607d8c3cae7cc6',
        enun: 'Quando foi assinado o tratado de rendição do Japão encerrando a Segunda Guerra Mundial?',
        alternativa1: '1942',
        alternativa2: '1943',
        alternativa3: '1944',
        alternativa4: '1945',
        correto: 4,
        timer: 30,
        sala_fk: '6636d1eed0607d8c3cae7cbe',
        __v: 0,
      },
    ],
  })
  listaPerguntas: PerguntaResponse[];
}
