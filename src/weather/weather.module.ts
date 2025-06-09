import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Module({
  imports: [HttpModule],
  providers: [WeatherService],
  exports: [WeatherService],
})
export class WeatherModule {}
