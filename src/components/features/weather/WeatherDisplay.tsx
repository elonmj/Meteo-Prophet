'use client';

import { WeatherData } from '@/core/types/weather';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { WeatherStats } from '@/components/features/weather/WeatherStats';
import { WeatherChart } from '@/components/features/weather/WeatherChart';
import { CurrentWeather } from '@/components/features/weather/CurrentWeather';
import { DailyForecast } from '@/components/features/weather/DailyForecast';

interface WeatherDisplayProps {
  forecast: WeatherData;
  isLoading?: boolean;
}

export const WeatherDisplay = ({ forecast, isLoading }: WeatherDisplayProps) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CurrentWeather data={forecast.current} />
        <WeatherStats data={forecast.current} />
      </div>
      <WeatherChart hourlyData={forecast.hourly} />
      <DailyForecast data={forecast.daily} />
    </div>
  );
};