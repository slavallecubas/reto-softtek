import { Injectable } from '@nestjs/common';
import { CreateFusionDto } from './dto/create-fusion.dto';
import { SwapiService } from 'src/swapi/swapi.service';
import { WeatherService } from 'src/weather/weather.service';
import { v4 as uuidv4 } from 'uuid';
import { IFuseData } from 'src/common/interfaces/commons.interface';

@Injectable()
export class FusionService {
  constructor(
    private readonly swapiService: SwapiService,
    private readonly weatherService: WeatherService,
  ) {}

  private planetCityMap = {
    Tatooine: 'Cairo',
    Hoth: 'Reykjavik',
    Naboo: 'Venice',
    Coruscant: 'Tokyo',
    Alderaan: 'Geneva',
  };

  async getFusionData(createFusionDto: CreateFusionDto): Promise<IFuseData> {
    try {
      const personaje = await this.swapiService.getCharacter(
        createFusionDto.characterId,
      );

      const planeta = await this.swapiService.getPlanetFromUrl(
        personaje.homeworld,
      );

      const ciudad = this.planetCityMap[planeta.name] || 'London';

      const clima = await this.weatherService.getWeatherByCity(ciudad);

      const dataFusionada: IFuseData = {
        id: uuidv4(),
        character: {
          name: personaje.name,
          height: this.normalizeHeight(personaje.height),
          mass: this.normalizeMass(personaje.mass),
          birthYear: personaje.birth_year,
          gender: personaje.gender,
          homeworld: {
            name: planeta.name,
            climate: planeta.climate,
            terrain: planeta.terrain,
            population: this.normalizePopulation(planeta.population),
          },
        },
        planet: {
          climate: planeta.climate,
          name: planeta.name,
          population: this.normalizePopulation(planeta.population),
          terrain: planeta.terrain,
        },
        weather: {
          city: clima.name,
          country: clima.sys.country,
          temperature: Math.round(clima.main.temp),
          feelsLike: Math.round(clima.main.feels_like),
          humidity: clima.main.humidity,
          pressure: clima.main.pressure,
          description: clima.weather[0].description,
          windSpeed: clima.wind.speed,
        },
        metadata: {
          createdAt: new Date().toISOString(),
          sources: {
            character: personaje.url,
            weather: `OpenWeatherMap - ${ciudad}`,
          },
        },
      };

      return dataFusionada;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  private normalizeHeight(height: string): number | null {
    if (height === 'unknown') return null;
    const numHeight = parseInt(height, 10);
    return isNaN(numHeight) ? null : numHeight;
  }

  private normalizeMass(mass: string): number | null {
    if (mass === 'unknown') return null;
    const cleanMass = mass.replace(',', '');
    const numMass = parseInt(cleanMass, 10);
    return isNaN(numMass) ? null : numMass;
  }

  private normalizePopulation(population: string): number | null {
    if (population === 'unknown') return null;
    const cleanPop = population.replace(/,/g, '');
    const numPop = parseInt(cleanPop, 10);
    return isNaN(numPop) ? null : numPop;
  }
}
