export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Location extends Coordinates {
  id: string;
  name: string;
  local_names?: Record<string, string>;
  region: 'nord' | 'centre' | 'sud';
  department: string;
  country: string;
  timezone: string;
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Temperature {
  value: number;
  feels_like: number;
  min?: number;
  max?: number;
}

export interface Wind {
  speed: number;
  degree: number;
  direction: string;
  gust?: number;
}

export interface Precipitation {
  probability: number;
  amount: number;
  type: 'rain' | 'snow' | 'none';
}

export interface AtmosphericConditions {
  pressure: number;
  humidity: number;
  visibility: number;
  cloud_cover: number;
  uv_index: number;
}

export interface WeatherDataPoint {
  timestamp: number;
  temperature: Temperature;
  weather_condition: WeatherCondition;
  wind: Wind;
  precipitation: Precipitation;
  atmospheric: AtmosphericConditions;
}

export interface DailyForecast extends WeatherDataPoint {
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
}

export interface WeatherData {
  location: Location;
  current: WeatherDataPoint;
  hourly: WeatherDataPoint[];
  daily: DailyForecast[];
  last_updated: number;
  alerts?: WeatherAlert[];
}

export interface WeatherAlert {
  id: string;
  sender: string;
  event: string;
  start: number;
  end: number;
  description: string;
  severity: 'minor' | 'moderate' | 'severe' | 'extreme';
}

export interface ForecastResponse {
  success: boolean;
  data: WeatherData;
  message?: string;
}

export interface WeatherError {
  name: string;  // Ajout de la propriété name requise
  code: string;
  message: string;
  status: number;
  details?: Record<string, any>;
}

// Types pour les statistiques et l'analyse
export interface WeatherStats {
  period: {
    start: number;
    end: number;
  };
  temperature: {
    average: number;
    min: number;
    max: number;
    stdDev: number;
  };
  precipitation: {
    total: number;
    days_with_rain: number;
    max_intensity: number;
  };
  confidence_score: number;
}

// Types pour les paramètres de requête
export interface WeatherQueryParams {
  latitude: number;
  longitude: number;
  units?: 'metric' | 'imperial';
  lang?: string;
  days?: number;
}
