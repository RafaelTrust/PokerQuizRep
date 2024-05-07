import { Injectable } from '@nestjs/common';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  RevokedToken,
  RevokedTokenDocument,
} from './entities/revoked-token.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(RevokedToken.name)
    private revokedTokenModel: Model<RevokedTokenDocument>,
    private readonly usuarioService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async login(usuario: Usuario) {
    if (!usuario.cadastroValido) {
      return {
        token: '',
        nick: '',
      };
    }
    const payload = { sub: usuario.nick, email: usuario.email };

    //return this.jwtService.sign(payload);
    return {
      token: this.jwtService.sign(payload),
      nick: usuario.nick,
    };
  }

  async revokeToken(token: string) {
    await this.limparBlackList();
    const dataAtual = new Date();
    const revokedToken = new this.revokedTokenModel({
      token,
      data: dataAtual.toDateString(),
    });
    await revokedToken.save();
  }

  async isTokenRevoked(token: string): Promise<boolean> {
    // Verifique se o token está na lista negra no banco de dados
    let isInBlackList = await this.revokedTokenModel.findOne({ token });
    return !!isInBlackList;
  }

  async validateUser(email: string, senha: string) {
    let usuario: Usuario;
    try {
      usuario = await this.usuarioService.findOneByEmail(email);
    } catch (error) {
      return null;
    }

    if (usuario.codValida && usuario.cadastroValido) return null;

    const senhaValida = compareSync(senha, usuario.senha);
    if (!senhaValida) return null;

    return usuario;
  }

  //Corrigir
  async limparBlackList() {
    try {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() - 7);
      await this.revokedTokenModel.deleteMany({
        createdAt: { $lte: expirationDate },
      });
      console.log('Tokens expirados foram removidos da lista negra.');
    } catch (error) {
      console.error('Erro ao limpar tokens expirados:', error);
    }
  }
}
