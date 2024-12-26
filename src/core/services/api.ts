import axios from 'axios';
import { getApiUrl } from '@/core/config/env';
import { getMockWeatherData } from '../mocks/weather';

const isDev = process.env.NODE_ENV === 'development';

const api = axios.create({
  baseURL: getApiUrl(''),
  headers: {
    'Content-Type': 'application/json',
  },
});

export const weatherService = {
  getForecast: async (lat: number, lon: number) => {
    if (isDev) {
      // Utiliser la ville la plus proche des coordonnées données
      const mockData = getMockWeatherData('cotonou');
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulation de latence
      return mockData;
    }

    const response = await api.get('/weather/forecast', {
      params: { lat, lon },
    });
    return response.data;
  },

  getHistorical: async (lat: number, lon: number, days: number = 7) => {
    if (isDev) {
      const mockData = getMockWeatherData('cotonou');
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockData;
    }

    const response = await api.get('/weather/historical', {
      params: { lat, lon, days },
    });
    return response.data;
  },

  getCityData: async (cityId: string) => {
    const response = await api.get(`/weather/city/${cityId}`);
    return response.data;
  },
};

export const locationService = {
  getAllCities: async () => {
    const response = await api.get('/locations/cities');
    return response.data;
  },

  getRegions: async () => {
    const response = await api.get('/locations/regions');
    return response.data;
  },
};
