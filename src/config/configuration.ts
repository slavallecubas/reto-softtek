import { ConfigModule, ConfigService } from '@nestjs/config';

ConfigModule.forRoot();
const configService = new ConfigService();

export const PORT = parseInt(configService.getOrThrow<string>('PORT'), 10);
export const LOG_LEVEL = configService.getOrThrow<string>('LOG_LEVEL');
export const STAGE = configService.getOrThrow<string>('STAGE');
export const AWS = {
  AWS_REGION: configService.getOrThrow<string>('AWS_REGION'),
  AWS_ACCESS_KEY: configService.getOrThrow<string>('AWS_ACCESS_KEY'),
  AWS_SECRET_ACCESS_KEY: configService.getOrThrow<string>(
    'AWS_SECRET_ACCESS_KEY',
  ),
};
export const DYNAMODB = {
  DYNAMO_USERS_TABLE: configService.getOrThrow<string>('DYNAMO_USERS_TABLE'),
  DYNAMO_FUSION_TABLE: configService.getOrThrow<string>('DYNAMO_FUSION_TABLE'),
  DYNAMO_CACHE_TABLE: configService.getOrThrow<string>('DYNAMO_CACHE_TABLE'),
};

export const SWAPI_BASE_URL =
  configService.getOrThrow<string>('SWAPI_BASE_URL');
export const WEATHER = {
  WEATHER_BASE_URL: configService.getOrThrow<string>('WEATHER_BASE_URL'),
  WEATHER_API_KEY: configService.getOrThrow<string>('WEATHER_API_KEY'),
};

export const JWT_SECRET = configService.getOrThrow<string>('JWT_SECRET');
export const CACHE_TTL = configService.getOrThrow<number>('CACHE_TTL');
export const THROTTLE_TTL = configService.getOrThrow<number>('THROTTLE_TTL');
export const THROTTLE_LIMIT =
  configService.getOrThrow<number>('THROTTLE_LIMIT');
