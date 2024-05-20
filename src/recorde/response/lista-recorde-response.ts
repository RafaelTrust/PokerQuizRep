import { ApiProperty } from '@nestjs/swagger';
import { RecordeResponse } from './recorde-response';

export class ListaRecordeResponse {
  @ApiProperty({
    description: 'Lista retornada de recordes de uma unica mesa.',
    example: [
      {
        _id: '663d652b8d3b80c1099d2220',
        sala_fk: '6636e2d0d0607d8c3cae7cff',
        player_fk: '',
        nick: 'Paoli',
        logado: false,
        valor: 51200,
        pcent_acertos: 80,
        data: '2024-4-10',
        __v: 0,
      },
      {
        _id: '663e3077cf2d4177f5efb801',
        sala_fk: '6636e2d0d0607d8c3cae7cff',
        player_fk: '663d743e7f23ac859733eac0',
        nick: 'RafaelTrust',
        logado: true,
        valor: 9024.7900390625,
        pcent_acertos: 60,
        data: '2024-4-10',
        __v: 0,
      },
      {
        _id: '663d685e8d3b80c1099d2295',
        sala_fk: '6636e2d0d0607d8c3cae7cff',
        player_fk: '',
        nick: 'pai',
        logado: false,
        valor: 400,
        pcent_acertos: 10,
        data: '2024-4-10',
        __v: 0,
      },
    ],
  })
  listaRecorde: RecordeResponse[];
}
