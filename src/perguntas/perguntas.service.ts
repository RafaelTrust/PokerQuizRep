import { Injectable } from '@nestjs/common';
import { CreatePerguntaDto } from './dto/create-pergunta.dto';
import { UpdatePerguntaDto } from './dto/update-pergunta.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pergunta, PerguntaDocument } from './entities/pergunta.entity';
import { Model } from 'mongoose';
import OpenAI from 'openai';
import { PerguntaIA } from './interface/perguntaIA';
import { GerarIADto } from './dto/gerar-ia.dto';

@Injectable()
export class PerguntasService {
  private readonly openai: OpenAI;
  constructor(
    @InjectModel(Pergunta.name) private porguntaModel: Model<PerguntaDocument>,
  ) {
    this.openai = new OpenAI({
      apiKey: process.env.KEY_OPEN_IA,
      organization: process.env.KEY_ORGANIZATION_IA,
    });
  }

  async chatCompletion(dto: GerarIADto) {
    let prompt;
    if (dto.jsonPerguntas === '') {
      prompt = `Crie Quiz com o tema de ${dto.tema} usando o template com 1 perguntas:{[{"pergunta":"","alternativas":"resposta1","resposta1","resposta1","resposta1"],"resposta":"resposta"}]}. Não coloque nada na resposta que impeça a leitura do json`;
    } else {
      prompt = `Crie Quiz com o tema de ${dto.tema} usando o template com 1 perguntas:{[{"pergunta":"","alternativas":"resposta1","resposta1","resposta1","resposta1"],"resposta":"resposta"}]}. Faça a pergunta diferente dessas que ja foram usadas: ${dto.jsonPerguntas}. Não coloque nada na resposta que impeça a leitura do json`;
    }
    const res = await this.openai.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      //model: 'gpt-4-turbo',
      model: 'gpt-3.5-turbo-0125',
    });
    let deuErro = false;
    //Corrigindo JSON da api e transformando em objeto
    const jsonCorrigido = res.choices[0].message.content.replace(/\n/g, '');
    let resJson: PerguntaIA;
    let resJsonCorrigido: PerguntaIA;
    try {
      resJson = JSON.parse(res.choices[0].message.content);
    } catch (error) {
      deuErro = true;
      const oDoisPontos = [];
      const oVirgula = [];
      for (let i = 0; i < jsonCorrigido.length; i++) {
        if (jsonCorrigido[i] === ':') {
          oDoisPontos.push(i);
        } else if (jsonCorrigido[i] === ',') {
          oVirgula.push(i);
        }
      }
      resJsonCorrigido = {
        pergunta: jsonCorrigido
          .slice(oDoisPontos[0], oDoisPontos[1] - 14)
          .replace(/}/g, '')
          .replace(/]/g, '')
          .replace(/"/g, '')
          .replace(/:/g, '')
          .replace(/,/g, '')
          .replace(/]/g, ''),
        alternativas: [],
        resposta: jsonCorrigido
          .slice(oDoisPontos[2])
          .replace(/}/g, '')
          .replace(/]/g, '')
          .replace(/"/g, '')
          .replace(/:/g, '')
          .replace(/,/g, '')
          .replace(/]/g, ''),
      };
      resJsonCorrigido.alternativas[0] = jsonCorrigido
        .slice(oDoisPontos[1], oVirgula[1])
        .replace(/}/g, '')
        .replace(/]/g, '')
        .replace(/"/g, '')
        .replace(/:/g, '')
        .replace(/,/g, '')
        .replace(/]/g, '');
      resJsonCorrigido.alternativas[1] = jsonCorrigido
        .slice(oVirgula[1], oVirgula[2])
        .replace(/}/g, '')
        .replace(/]/g, '')
        .replace(/"/g, '')
        .replace(/:/g, '')
        .replace(/,/g, '')
        .replace(/]/g, '');
      resJsonCorrigido.alternativas[2] = jsonCorrigido
        .slice(oVirgula[2], oVirgula[3])
        .replace(/}/g, '')
        .replace(/]/g, '')
        .replace(/"/g, '')
        .replace(/:/g, '')
        .replace(/,/g, '')
        .replace(/]/g, '');
      resJsonCorrigido.alternativas[3] = jsonCorrigido
        .slice(oVirgula[3], oVirgula[4])
        .replace(/}/g, '')
        .replace(/]/g, '')
        .replace(/"/g, '')
        .replace(/:/g, '')
        .replace(/,/g, '')
        .replace(/]/g, '');
    }

    let altCorreta = 0;
    let pergunta: CreatePerguntaDto;

    if (!deuErro) {
      if (Array.isArray(resJson)) {
        resJsonCorrigido = resJson[0];
      } else {
        resJsonCorrigido = resJson;
      }
    }

    for (let i = 0; i < 4; i++) {
      if (resJsonCorrigido.alternativas[i] === resJsonCorrigido.resposta) {
        altCorreta = i + 1;
      }
    }

    pergunta = {
      enun: resJsonCorrigido.pergunta,
      alternativa1: resJsonCorrigido.alternativas[0],
      alternativa2: resJsonCorrigido.alternativas[1],
      alternativa3: resJsonCorrigido.alternativas[2],
      alternativa4: resJsonCorrigido.alternativas[3],
      correto: altCorreta,
      sala_fk: '',
      timer: 30,
    };

    return pergunta;
  }

  async create(createPerguntaDto: CreatePerguntaDto) {
    const pergunta = await new this.porguntaModel(createPerguntaDto);
    await pergunta.save();
    let listaPerguntas = await this.porguntaModel.find({
      sala_fk: pergunta.sala_fk,
    });
    return {
      listaPerguntas,
    };
  }

  findAll() {
    return this.porguntaModel.find();
  }

  async findBySala(sala_fk: string) {
    let listaPerguntas = await this.porguntaModel.find({ sala_fk });
    console.log(listaPerguntas[0].toJSON());
    return {
      listaPerguntas,
    };
  }

  async findOne(id: string) {
    return await this.porguntaModel.findById(id);
  }

  async update(id: string, updatePerguntaDto: UpdatePerguntaDto) {
    let pergunta = await this.porguntaModel.findOne({ _id: id });
    updatePerguntaDto.sala_fk = pergunta.sala_fk;
    pergunta = Object.assign(pergunta, updatePerguntaDto);
    return pergunta.save();
  }

  async remove(id: string) {
    let pergunta = await this.porguntaModel.findOne({ _id: id }).exec();
    let sala_fk = pergunta.sala_fk;
    await this.porguntaModel.deleteOne({ _id: id }).exec();
    let listaPerguntas = await this.porguntaModel.find({ sala_fk });
    return {
      listaPerguntas,
    };
  }
}
