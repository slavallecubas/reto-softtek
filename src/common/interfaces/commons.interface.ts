export interface IWeather {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface SwapiCharacter {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface SwapiPlanet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export class HomeworldDto {
  name: string;
  climate: string;
  terrain: string;
  population: number | null;
}

export class CharacterDto {
  name: string;
  height: number | null;
  mass: number | null;
  birthYear: string;
  gender: string;
  homeworld: HomeworldDto;
}

export class WeatherDto {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  description: string;
  windSpeed: number;
}

export class MetadataDto {
  createdAt: string;
  sources: {
    character: string;
    weather: string;
  };
}

export class IFuseData {
  id: string;
  character: CharacterDto;
  planet: HomeworldDto;
  weather: WeatherDto;
  metadata: MetadataDto;
}
