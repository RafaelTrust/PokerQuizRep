import { ApiProperty } from '@nestjs/swagger';
import { SalaResponse } from './sala-response';
import { PerguntaResponse } from 'src/perguntas/response/pergunta-response';

export class SalaPerguntaResponse {
  @ApiProperty({
    description: 'Sala buscada para efetuar o inicio do jogo',
    example: {
      _id: '663d759e7f23ac859733ead8',
      nome: 'Internet ',
      tema: 'Rede de computadores CCNA',
      responsavel_fk: '663d743e7f23ac859733eac0',
      limitPerguntas: 10,
      codSala: 'LELHiO',
      publico: true,
      __v: 0,
    },
  })
  sala: SalaResponse;

  @ApiProperty({
    description: 'Lista de perguntas relacionadas ao codigo da sala buscado',
    example: [
      {
        _id: '663d75a07f23ac859733eae8',
        enun: 'Qual é o número da porta padrão para o protocolo HTTPS?',
        alternativa1: '443',
        alternativa2: '80',
        alternativa3: '8080',
        alternativa4: '21',
        correto: 1,
        timer: 30,
        sala_fk: '663d759e7f23ac859733ead8',
        __v: 0,
      },
      {
        _id: '663d75a17f23ac859733eaec',
        enun: 'Qual o comando utilizado para verificar o status de uma interface em um roteador Cisco?',
        alternativa1: 'show interface',
        alternativa2: 'interface status',
        alternativa3: 'ping',
        alternativa4: 'telnet',
        correto: 1,
        timer: 30,
        sala_fk: '663d759e7f23ac859733ead8',
        __v: 0,
      },
      {
        _id: '663d75a07f23ac859733eae8',
        enun: 'Em uma rede de computadores, o que significa a sigla DNS?',
        alternativa1: 'Domain Name System',
        alternativa2: 'Dynamic Network System',
        alternativa3: 'Data Network Server',
        alternativa4: 'Digital Network Security',
        correto: 1,
        timer: 30,
        sala_fk: '663d759e7f23ac859733ead8',
        __v: 0,
      },
    ],
  })
  listaPerguntas: PerguntaResponse[];
}
