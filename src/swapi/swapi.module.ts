import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SwapiService } from './swapi.service';

@Module({
  imports: [HttpModule],
  providers: [SwapiService],
  exports: [SwapiService],
})
export class SwapiModule {}
