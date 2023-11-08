import { PartialType } from '@nestjs/mapped-types';
import { CreateSalaJogadoresDto } from './create-sala-jogadores.dto';

export class UpdateSalaJogadoresDto extends PartialType(
  CreateSalaJogadoresDto,
) {}
