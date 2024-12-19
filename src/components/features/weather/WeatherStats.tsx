'use client';

import { WeatherDataPoint } from '@/core/types/weather';

interface WeatherStatsProps {
  data: WeatherDataPoint;
}

export const WeatherStats = ({ data }: WeatherStatsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-white/10 backdrop-blur-sm">
      <div>
        <p className="text-sm text-gray-500">Humidité</p>
        <p className="text-xl font-semibold">{data.atmospheric.humidity}%</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Vent</p>
        <p className="text-xl font-semibold">{data.wind.speed} km/h</p>
      </div>
    </div>
  );
};
