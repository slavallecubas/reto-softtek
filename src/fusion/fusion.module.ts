import { Module } from '@nestjs/common';
import { FusionService } from './fusion.service';
import { FusionController } from './fusion.controller';
import { SwapiModule } from 'src/swapi/swapi.module';
import { WeatherModule } from 'src/weather/weather.module';

@Module({
  imports: [SwapiModule, WeatherModule],
  controllers: [FusionController],
  providers: [FusionService],
})
export class FusionModule {}
