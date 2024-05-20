import { ApiProperty } from '@nestjs/swagger';
import { EstatisticaResponse } from './estatistica- response';

export class listaEstatisticaResponse {
  @ApiProperty({
    description:
      'Lista de respostas dos usuarios para criar uma estatistica para cada pergunta da mesa.',
    example: [
      {
        _id: '663d63bb8d3b80c1099d21dc',
        sala_fk: '663d63bb8d3b80c1099d21dc',
        pergunta_fk: '6639df493b839867aac57535',
        alternativa: 1,
        correto: 3,
        __v: 0,
      },
      {
        _id: '663d64618d3b80c1099d21e7',
        sala_fk: '663d63bb8d3b80c1099d21dc',
        pergunta_fk: '6639df493b839867aac57535',
        alternativa: 1,
        correto: 3,
        __v: 0,
      },
      {
        _id: '663d64618d3b80c1099d21e9',
        sala_fk: '663d63bb8d3b80c1099d21dc',
        pergunta_fk: '6639df493b839867aac57531',
        alternativa: 1,
        correto: 1,
        __v: 0,
      },
      {
        _id: '663d64618d3b80c1099d21eb',
        sala_fk: '663d63bb8d3b80c1099d21dc',
        pergunta_fk: '6639df493b839867aac5752d',
        alternativa: 1,
        correto: 1,
        __v: 0,
      },
    ],
  })
  listaEstatistica: EstatisticaResponse;
}
