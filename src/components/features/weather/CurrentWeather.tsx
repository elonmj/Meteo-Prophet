'use client';

import { WeatherDataPoint } from '@/core/types/weather';

interface CurrentWeatherProps {
  data: WeatherDataPoint;
}

export const CurrentWeather = ({ data }: CurrentWeatherProps) => {
  return (
    <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm">
      <h2 className="text-2xl font-bold mb-2">Météo Actuelle</h2>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-4xl font-bold">{data.temperature.value}°C</p>
          <p className="text-gray-500">Ressenti {data.temperature.feels_like}°C</p>
        </div>
        <div className="text-right">
          <p className="text-sm">Précipitation: {data.precipitation.probability}%</p>
          <p className="text-sm">Pression: {data.atmospheric.pressure} hPa</p>
        </div>
      </div>
    </div>
  );
};
