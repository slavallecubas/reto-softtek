import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import {
  SwapiCharacter,
  SwapiPlanet,
} from 'src/common/interfaces/commons.interface';
import { SWAPI_BASE_URL } from 'src/config/configuration';

@Injectable()
export class SwapiService {
  private readonly baseUrl: string;

  constructor(private readonly httpService: HttpService) {
    this.baseUrl = SWAPI_BASE_URL;
  }

  async getCharacter(characterId: number): Promise<SwapiCharacter> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<SwapiCharacter>(
          `${this.baseUrl}/people/${characterId}`,
        ),
      );
      const character = response.data;
      return character;
    } catch (err) {
      throw new Error(`Falló al obtener personaje ${characterId}`);
    }
  }

  async getPlanet(planetId: number): Promise<SwapiPlanet> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<SwapiPlanet>(
          `${this.baseUrl}/planets/${planetId}`,
        ),
      );
      const planet = response.data;
      return planet;
    } catch (err) {
      throw new Error(`Falló al obtener planeta ${planetId}`);
    }
  }

  async getPlanetFromUrl(url: string): Promise<SwapiPlanet> {
    const planetId = this.extractIdFromUrl(url);
    return this.getPlanet(planetId);
  }

  private extractIdFromUrl(url: string): number {
    const matches = url.match(/\/(\d+)\/$/);
    if (!matches) {
      throw new Error(`Invalid URL format: ${url}`);
    }
    return parseInt(matches[1], 10);
  }
}
