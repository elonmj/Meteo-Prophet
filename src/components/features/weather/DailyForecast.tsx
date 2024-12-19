'use client';

import { DailyForecast as DailyForecastType } from '@/core/types/weather';

interface DailyForecastProps {
  data: DailyForecastType[];
}

export const DailyForecast = ({ data }: DailyForecastProps) => {
  return (
    <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm">
      <h3 className="text-lg font-semibold mb-4">Prévisions sur 7 jours</h3>
      <div className="space-y-2">
        {data.slice(0, 7).map((day, index) => (
          <div key={index} className="flex justify-between items-center">
            <span>{new Date(day.timestamp * 1000).toLocaleDateString('fr-FR', { weekday: 'long' })}</span>
            <div className="flex items-center gap-4">
              <img 
                src={`/icons/${day.weather_condition.icon}.png`} 
                alt={day.weather_condition.description} 
                className="w-8 h-8"
              />
              <span>{Math.round(day.temperature.max || day.temperature.value)}°C</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
