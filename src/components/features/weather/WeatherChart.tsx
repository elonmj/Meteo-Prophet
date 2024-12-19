'use client';

import { WeatherDataPoint } from '@/core/types/weather';

interface WeatherChartProps {
  hourlyData: WeatherDataPoint[];
}

export const WeatherChart = ({ hourlyData }: WeatherChartProps) => {
  return (
    <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm">
      <h3 className="text-lg font-semibold mb-4">Prévisions horaires</h3>
      <div className="h-48 flex items-end justify-between gap-2">
        {hourlyData.slice(0, 24).map((hour, index) => (
          <div
            key={index}
            className="bg-blue-500 w-full"
            style={{ height: `${(hour.temperature.value / 40) * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
};
