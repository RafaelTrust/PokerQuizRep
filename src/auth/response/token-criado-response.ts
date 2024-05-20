import { ApiProperty } from '@nestjs/swagger';

export class CreatedTokenResponse {
  @ApiProperty({
    description: 'Token criado para a sessão de 1 hora de jogo',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSYWZhZWxUcnVzdCIsImVtYWlsIjoicmFmYWVsaW1hZmVycmVpcmFAZ21haWwuY29tIiwiaWF0IjoxNzE2MjA1ODMyLCJleHAiOjE3MTYyMDk0MzJ9.GOJaT0ncRrgO7PXV3iQ2amvx9eVQjDUHVNp_TuyALP0',
  })
  token: string;

  @ApiProperty({
    description: 'Nick do usuario cadastrado.',
    example: 'RafaelTrust',
  })
  nick: string;
}
