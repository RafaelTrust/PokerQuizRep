import { ApiProperty } from '@nestjs/swagger';

export class UsuarioResponse {
  @ApiProperty({
    description: 'Id gerado no banco de dados do usuario',
    example: '663de96267b9531920a75b14',
  })
  _id: string;

  @ApiProperty({
    description: 'Nome do usuario',
    example: 'Rafael Lima',
  })
  nome: string;

  @ApiProperty({
    description:
      'O nick é para não só uma identificação unica de cada usuario como tambem uma forma do usuario poder ser chamado da forma que quiser.',
    example: 'RafaelTrust',
  })
  nick: string;

  @ApiProperty({
    description:
      'O email alem de ser usado na identificação de login tambem é uma forma segura de se comunicar com o usuario sem ser pelo app.',
    example: 'rafaelimaferreira@gmail.com',
  })
  email: string;

  @ApiProperty({
    description:
      'A senha alem de ser guardada com criptografia, ela é conduzida dentro de um token JWT que também é criptografado para segurança do usuario. Lembrando que via Post a senha vem como o usuario digitou.',
    example: '$2b$10$h24SCIzchgMpg0tBylDdV.Nyf4QTFvhJYRkz7BwOIy8mYEixqtwgy',
  })
  senha: string;

  @ApiProperty({
    description:
      'Codigo gerado na hora de cadastro ou na hora da recuperação de senha para serem validados posteriormente pelo usuario',
    example: null,
  })
  codValida: string;

  @ApiProperty({
    description:
      'Mostra se a conta cadastrada esta valida para uso depois do usuario validar atravez de seu email.',
    example: true,
  })
  cadastroValido: boolean;

  @ApiProperty({
    description: 'Numero da versão atualizada pela api',
    example: 0,
  })
  __v: number;
}
