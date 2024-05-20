import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class UpdateUsuarioDto {
  @ApiPropertyOptional({
    description:
      'Serve apenas para identificação posterior de cada usuario, caso o professor solicite.',
    example: 'Rafael Lima',
  })
  nome?: string;

  @ApiPropertyOptional({
    description:
      'O nick é para não só uma identificação unica de cada usuario como tambem uma forma do usuario poder ser chamado da forma que quiser.',
    example: 'RafaelTrust',
  })
  nick?: string;

  @ApiProperty({
    description:
      'O email alem de ser usado na identificação de login tambem é uma forma segura de se comunicar com o usuario sem ser pelo app.',
    example: 'rafaelimaferreira@gmail.com',
  })
  email: string;

  @ApiProperty({
    description:
      'A senha alem de ser guardada com criptografia, ela é conduzida dentro de um token JWT que também é criptografado para segurança do usuario. Lembrando que via Post a senha vem como o usuario digitou.',
    example: 'uh-VR4\\p004;',
  })
  senha: string;
}
