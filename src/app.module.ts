import { Module } from '@nestjs/common';
import { WeatherService } from './weather/weather.service';
import { SwapiService } from './swapi/swapi.service';
import { SwapiModule } from './swapi/swapi.module';
import { WeatherModule } from './weather/weather.module';
import { FusionModule } from './fusion/fusion.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    SwapiModule,
    WeatherModule,
    FusionModule,
    HttpModule,
    UsersModule,
    AuthModule,
  ],
  providers: [WeatherService, SwapiService],
})
export class AppModule {}
