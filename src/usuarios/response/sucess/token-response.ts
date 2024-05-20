import { ApiProperty } from '@nestjs/swagger';

export class TokenResponse {
  @ApiProperty({
    description:
      'Token criptografado do usuario para o uso dentro de uma hora.',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJQZWRGZXIiLCJlbWFpbCI6ImNhcnZhbGhvX3BlZHJvQGVtYWlsLmNvbSIsImlhdCI6MTcxNTExNjMwOCwiZXhwIjoxNzE1MTE5OTA4fQ.9i5FshNHocYN29Nn3B3gjDgFZM04XGf3Gy8zm_9WV4M',
  })
  token: string;
}
