import { PartialType } from '@nestjs/mapped-types';
import { CreateFusionDto } from './create-fusion.dto';

export class UpdateFusionDto extends PartialType(CreateFusionDto) {}
