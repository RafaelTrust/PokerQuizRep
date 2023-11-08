import { PartialType } from '@nestjs/mapped-types';
import { CreateRespostaDto } from './create-resposta.dto';

export class UpdateRespostaDto extends PartialType(CreateRespostaDto) {}
