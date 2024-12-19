import axios from 'axios';
import { getApiUrl } from '@/core/config/env';

const api = axios.create({
  baseURL: getApiUrl(''),
  headers: {
    'Content-Type': 'application/json',
  },
});

export const weatherService = {
  getForecast: async (lat: number, lon: number) => {
    const response = await api.get('/weather/forecast', {
      params: { lat, lon },
    });
    return response.data;
  },

  getHistorical: async (lat: number, lon: number, days: number = 7) => {
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
