import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FusionService } from './fusion.service';
import { CreateFusionDto } from './dto/create-fusion.dto';
import { IFuseData } from 'src/common/interfaces/commons.interface';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('fusionados')
@UseGuards(AuthGuard)
export class FusionController {
  constructor(private readonly fusionService: FusionService) {}

  @Get()
  async getFusionData(
    @Query() createFusionDto: CreateFusionDto,
  ): Promise<IFuseData> {
    const characterId = createFusionDto.characterId;
    return this.fusionService.getFusionData({ characterId });
  }
}
