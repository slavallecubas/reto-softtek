import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { NUMERO } from 'src/common/libs/Constants';

export class CreateFusionDto {
  @IsNumber({}, { message: 'characterId debe ser un número' })
  @Type(() => Number)
  @IsNotEmpty({ message: 'characterId no debe estar vacío' })
  @Min(NUMERO.UNO, { message: 'characterId debe ser 1 como mínimo' })
  @Max(NUMERO.OCHENTAYTRES, { message: 'characterId no puede exceder el 83' })
  characterId: number;
}
