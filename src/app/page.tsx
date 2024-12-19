'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useWeather } from '@/hooks/useWeather';
import { WeatherDisplay } from '@/components/features/weather/WeatherDisplay';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorDisplay } from '@/components/errors/main';
import type { Coordinates, WeatherError } from '@/core/types/weather';

const WeatherMap = dynamic(
  () => import('@/components/features/weather/WeatherMap').then(mod => mod.WeatherMap),
  { ssr: false }
);

export default function HomePage() {
  const [location, setLocation] = useState<Coordinates>({ 
    latitude: 6.3654, // Cotonou
    longitude: 2.4183 
  });

  const { data, isLoading, error, refetch } = useWeather(location.latitude, location.longitude);

  if (isLoading) return <LoadingSpinner />;
  
  if (error) {
    const weatherError = error as WeatherError;
    weatherError.name = weatherError.name || 'WeatherError'; // Assure la présence de 'name'
    return <ErrorDisplay error={weatherError} retry={refetch} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">
        Prévisions Météo au Bénin
      </h1>
      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <WeatherMap 
            onLocationSelect={setLocation}
            selectedLocation={location}
          />
          <WeatherDisplay forecast={data} />
        </div>
      )}
    </div>
  );
}