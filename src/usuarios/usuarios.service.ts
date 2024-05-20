import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
        cadastroValido: false,
      });
      await this.emailService.sendEmail(
        usuario.email,
        'Confirmando Email',
        `Passe esse codigo para o app ${codValida}`,
      );
      await usuario.save();
      return codValida;
    } else {
      throw new HttpException(
        { statusCode: 409, message: 'Nick ou Email ja existente' },
        HttpStatus.CONFLICT,
      );
    }
  }

  async verificaNick(nick: string) {
    let usuario = await this.usuarioModel.findOne({ nick });
    return { nickValido: !usuario };
  }

  async verificaEmail(email: string) {
    let usuario = await this.usuarioModel.findOne({ email });
    return { emailValido: !usuario };
  }

  async verificaCadastro(cod: string) {
    const usuario = await this.usuarioModel.findOne({ codValida: cod });
    if (usuario) {
      usuario.codValida = null;
      usuario.cadastroValido = true;
      usuario.save();
      const payload = { sub: usuario.nick, email: usuario.email };
      return this.jwtService.sign(payload, { expiresIn: '1h' });
    } else {
      throw new HttpException(
        { statusCode: 400, message: 'Codigo invalido' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOneByEmail(email: string): Promise<Usuario> {
    return await this.usuarioModel.findOne({ email });
  }

  async findOne(nick: string) {
    const usuario = await this.usuarioModel.findOne({ nick });
    if (usuario) {
      return usuario;
    } else {
      throw new HttpException(
        { statusCode: 404, message: 'Falha ao encontrar o usuario' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(updateUsuarioDto: UpdateUsuarioDto, id: string) {
    let usuario = await this.usuarioModel
      .findOne({
        email: updateUsuarioDto.email,
        senha: updateUsuarioDto.senha,
      })
      .exec();
    if (!usuario) {
      updateUsuarioDto.senha = await hashSync(updateUsuarioDto.senha, 10);
    }
    let updateUsuario = await this.usuarioModel.findById({ _id: id });
    updateUsuario = Object.assign(updateUsuario, updateUsuarioDto);
    return await updateUsuario.save();
  }

  async remove(id: string) {
    return await this.usuarioModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }

  async findEmail(email: string) {
    const usuario = await this.usuarioModel.findOne({ email });
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
    } else {
      throw new HttpException(
        { statusCode: 404, message: 'Falha ao encontrar email' },
        HttpStatus.NOT_FOUND,
      );
    }
    return usuario;
  }

  async esqueciSenha(cod: string) {
    const usuario = await this.usuarioModel.findOne({ codValida: cod });
    if (usuario) {
      usuario.codValida = null;
      usuario.save();
      const payload = { sub: usuario.nick, email: usuario.email };
      return this.jwtService.sign(payload, { expiresIn: '1h' });
    } else {
      throw new HttpException(
        { statusCode: 400, message: 'Codigo invalido' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
