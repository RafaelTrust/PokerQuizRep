import { ApiProperty } from '@nestjs/swagger';

export class DeleteGeneral {
  @ApiProperty({
    description: 'reconhecido',
    example: true,
  })
  acknowledged: boolean;

  @ApiProperty({
    description: 'Numero de itens deletados',
    example: 1,
  })
  deletedCount: number;
}
