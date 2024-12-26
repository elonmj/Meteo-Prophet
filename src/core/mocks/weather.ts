import { BENIN_LOCATIONS } from '../constants/locations';
import type { WeatherData, WeatherDataPoint, DailyForecast } from '../types/weather';

const createMockWeatherPoint = (timestamp: number): WeatherDataPoint => ({
  timestamp,
  temperature: {
    value: Number((25 + Math.random() * 10).toFixed(2)),
    feels_like: Number((26 + Math.random() * 8).toFixed(2)),
    min: Number((22 + Math.random() * 5).toFixed(2)),
    max: Number((30 + Math.random() * 5).toFixed(2))
  },
  weather_condition: {
    id: 800,
    main: 'Clear',
    description: 'Ciel dégagé',
    icon: '01d'
  },
  wind: {
    speed: Number((2 + Math.random() * 5).toFixed(2)),
    degree: Number((Math.random() * 360).toFixed(2)),
    direction: 'NE',
    gust: Number((5 + Math.random() * 5).toFixed(2))
  },
  precipitation: {
    probability: Number(Math.random().toFixed(2)),
    amount: Number((Math.random() * 10).toFixed(2)),
    type: Math.random() > 0.7 ? 'rain' : 'none'
  },
  atmospheric: {
    pressure: Number((1010 + Math.random() * 10).toFixed(2)),
    humidity: Number((40 + Math.random() * 40).toFixed(2)),
    visibility: Number((8000 + Math.random() * 2000).toFixed(2)),
    cloud_cover: Number((Math.random() * 100).toFixed(2)),
    uv_index: Number((Math.random() * 11).toFixed(2))
  }
});

const createMockDailyForecast = (timestamp: number): DailyForecast => ({
  ...createMockWeatherPoint(timestamp),
  sunrise: timestamp + 21600, // +6h
  sunset: timestamp + 64800,  // +18h
  moonrise: timestamp + 43200, // +12h
  moonset: timestamp + 86400, // +24h
  moon_phase: Number(Math.random().toFixed(2))
});

export const getMockWeatherData = (locationId: string): WeatherData => {
  const now = Date.now();
  const location = BENIN_LOCATIONS.find(loc => loc.id === locationId) || BENIN_LOCATIONS[0];

  return {
    location,
    current: createMockWeatherPoint(now),
    hourly: Array.from({length: 24}, (_, i) => 
      createMockWeatherPoint(now + i * 3600000)
    ),
    daily: Array.from({length: 7}, (_, i) => 
      createMockDailyForecast(now + i * 86400000)
    ),
    last_updated: now,
    alerts: Math.random() > 0.8 ? [{
      id: 'ALERT_1',
      sender: 'Météo Bénin',
      event: 'Fortes pluies',
      start: now,
      end: now + 86400000,
      description: 'Risque de fortes pluies dans les prochaines 24 heures',
      severity: 'moderate'
    }] : undefined
  };
};
