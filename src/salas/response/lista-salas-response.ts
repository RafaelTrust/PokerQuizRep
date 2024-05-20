import { ApiProperty } from '@nestjs/swagger';
import { SalaResponse } from './sala-response';

export class ListaPerguntasResponse {
  @ApiProperty({
    description: 'Resposta de todas as mesas encontradas',
    example: [
      {
        _id: '663d759e7f23ac859733ead8',
        nome: 'Internet ',
        tema: 'Rede de computadores CCNA',
        responsavel_fk: '663d743e7f23ac859733eac0',
        limitPerguntas: 10,
        codSala: 'LELHiO',
        publico: true,
        __v: 0,
      },
      {
        _id: '6639df493b839867aac57529',
        nome: 'Socorro',
        tema: 'Geografia do Brasil',
        responsavel_fk: '655528b7e5c7b0545dfedc2b',
        limitPerguntas: 11,
        codSala: 'EgILhS',
        publico: true,
        __v: 0,
      },
      {
        _id: '6639d9dc3b839867aac5747e',
        nome: 'Lesma',
        tema: 'Jogos de Video Game',
        responsavel_fk: '655528b7e5c7b0545dfedc2b',
        limitPerguntas: 10,
        codSala: '9q5RXX',
        publico: true,
        __v: 0,
      },
    ],
  })
  mesas: SalaResponse[];
}
