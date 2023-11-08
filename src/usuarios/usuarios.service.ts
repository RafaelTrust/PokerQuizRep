import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario, UsuarioDocument } from './entities/usuario.entity';
import { Model } from 'mongoose';
import { hashSync } from 'bcrypt';
import { EmailService } from 'src/email/email.service';
import { BibliotecaService } from 'src/biblioteca/biblioteca.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<UsuarioDocument>,
    private readonly emailService: EmailService,
    private readonly bibliotecaService: BibliotecaService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    let passou = true;
    let listUsuarios = await this.usuarioModel.find().exec();
    for (let player of listUsuarios) {
      if (
        createUsuarioDto.nick === player.nick ||
        createUsuarioDto.email === player.email
      ) {
        passou = false;
      }
    }
    createUsuarioDto.senha = await hashSync(createUsuarioDto.senha, 10);

    //Verificando se o codigo é unico
    let codValido = true;
    let codValida;
    while (codValido) {
      codValido = false;
      codValida = this.bibliotecaService.generateRandomConfirmationCode(6);
      for (let player of listUsuarios) {
        if (player.codValida === codValida) {
          codValido = true;
        }
      }
    }

    if (passou) {
      const usuario = await new this.usuarioModel({
        ...createUsuarioDto,
        codValida,
      });
      await this.emailService.sendEmail(
        usuario.email,
        'Confirmando Email',
        `Clique na link a baixo \nhttp://localhost:3003/usuarios/verifica-cadastro/${codValida}`,
      );
      return await usuario.save();
    } else {
      throw 'nick ou email ja existente';
    }
  }

  async verificaNick(nick: string) {
    let usuario = await this.usuarioModel.findOne({ nick });
    return { nickValido: !usuario };
  }

  async verificaCadastro(cod: string) {
    const usuario = await this.usuarioModel.findOne();
    if (usuario) {
      usuario.codValida = null;
      usuario.save();
      return 'Validado com sucesso';
    } else {
      throw 'Codigo invalido';
    }
  }

  async findOneByEmail(email: string): Promise<Usuario> {
    return await this.usuarioModel.findOne({ email });
  }

  async findAll() {
    return await this.usuarioModel.find();
  }

  async findOne(id: string) {
    return await this.usuarioModel.findById(id);
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    return await this.usuarioModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        updateUsuarioDto,
      },
      {
        new: false,
      },
    );
  }

  async remove(id: string) {
    return await this.usuarioModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }

  async findEmailBool(email: string) {
    const usuario = await this.usuarioModel.findOne({ email }).exec();
    let cod = '000000';
    let valido = true;
    if (usuario) {
      while (valido) {
        cod = this.bibliotecaService.generateRandomConfirmationCodeNumber(6);
        valido = cod !== usuario.codValida ? false : true;
      }
      usuario.codValida = cod;
      await usuario.save();

      await this.emailService.sendEmail(
        email,
        'Codigo de Recuperação',
        `O codigo para resetar sua senha: ${cod}`,
      );
    }
    return cod;
  }

  async esqueciSenha(cod: string) {
    const usuario = await this.usuarioModel.findOne({ codValida: cod });
    if (usuario) {
      usuario.codValida = null;
      usuario.save();
      const payload = { sub: usuario.nick, email: usuario.email };
      return this.jwtService.sign(payload, { expiresIn: '1h' });
    } else {
      throw 'codigo invalido';
    }
  }
}
