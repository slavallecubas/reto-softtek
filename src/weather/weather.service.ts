/* eslint-disable @typescript-eslint/no-unused-expressions */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { IWeather } from 'src/common/interfaces/commons.interface';
import { WEATHER } from 'src/config/configuration';

@Injectable()
export class WeatherService {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor(private readonly httpService: HttpService) {
    (this.baseUrl = WEATHER.WEATHER_BASE_URL),
      (this.apiKey = WEATHER.WEATHER_API_KEY);
  }

  async getWeatherByCity(city: string): Promise<IWeather> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<IWeather>(`${this.baseUrl}`, {
          params: {
            q: city,
            appid: this.apiKey,
            units: 'metric',
          },
        }),
      );

      const dataWeather = response.data;
      return dataWeather;
    } catch (err) {
      console.log(err);
      throw new Error(`Falló el servicio de Weather - Ciudad: ${city}`);
    }
  }

  translateWeatherCondition(condition: string): string {
    const translations = {
      Clear: 'Despejado',
      Clouds: 'Nublado',
      Rain: 'Lluvia',
      Snow: 'Nieve',
      Thunderstorm: 'Tormenta',
      Drizzle: 'Llovizna',
      Mist: 'Neblina',
      Fog: 'Niebla',
    };

    return translations[condition] || condition;
  }
}
