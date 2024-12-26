'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { weatherService } from '@/core/services/api';
import { getMockWeatherData } from '@/core/mocks/weather';
import type { 
  WeatherData, 
  WeatherError, 
  WeatherQueryParams, 
  ForecastResponse as WeatherForecastResponse 
} from '@/core/types/weather';

const isDev = process.env.NODE_ENV === 'development';

export function useWeather(latitude: number, longitude: number) {
  const params: WeatherQueryParams = {
    latitude,
    longitude,
    units: 'metric',
    lang: 'fr'
  };

  return useQuery<WeatherData, WeatherError>({
    queryKey: ['weather', params],
    queryFn: async () => {
      if (isDev) {
        // Utiliser des données mockées en développement
        return getMockWeatherData('cotonou');
      }
      try {
        const response = await axios.get<WeatherForecastResponse>('/api/weather', { params });
        return response.data.data; // Accès aux données via data.data car ForecastResponse contient { success, data, message? }
      } catch (err: any) {
        const weatherError: WeatherError = {
          name: 'WeatherError',
          code: err.response?.data?.code || 'FETCH_ERROR',
          message: err.response?.data?.message || "Erreur lors de la récupération des données météo",
          status: err.response?.status || 500,
          details: err.response?.data?.details
        };
        throw weatherError;
      }
    },
    staleTime: 1000 * 60 * 15 // 15 minutes
  });
}

export const useHistoricalWeather = (latitude: number, longitude: number, days: number = 7) => {
  const params: WeatherQueryParams = { latitude, longitude, days };
  
  return useQuery<WeatherForecastResponse[], WeatherError>({
    queryKey: ['weather', 'historical', params],
    queryFn: () => weatherService.getHistorical(latitude, longitude, days),
    staleTime: 1000 * 60 * 60, // 1 heure
    gcTime: 1000 * 60 * 60 * 24 // 24 heures
  });
};
