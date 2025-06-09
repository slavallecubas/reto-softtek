import { Module } from '@nestjs/common';
import { WeatherService } from './weather/weather.service';
import { SwapiService } from './swapi/swapi.service';
import { SwapiModule } from './swapi/swapi.module';
import { WeatherModule } from './weather/weather.module';
import { FusionModule } from './fusion/fusion.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SwapiModule,
    WeatherModule,
    FusionModule,
    HttpModule,
  ],
  providers: [WeatherService, SwapiService],
})
export class AppModule {}
