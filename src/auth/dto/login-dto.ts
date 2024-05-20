import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Email do usuario registrado no jogo.',
    example: 'rafaelimaferreira@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: 'Senha do usuario registrada no jogo.',
    example: '2527Buba',
  })
  password: string;
}
