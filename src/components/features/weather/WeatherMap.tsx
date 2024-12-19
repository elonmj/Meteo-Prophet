'use client';

import { useCallback, useMemo, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import { BENIN_LOCATIONS } from '@/core/constants/locations';
import { WeatherMarker } from './WeatherMarker';
import { Coordinates, Location } from '@/core/types/weather';

interface WeatherMapProps {
  onLocationSelect: (coordinates: Coordinates) => void;
  selectedLocation?: Coordinates;
}

export const WeatherMap = ({ onLocationSelect, selectedLocation }: WeatherMapProps) => {
  const center = useMemo(() => ({ latitude: 9.3077, longitude: 2.3158 }), []); // Centre du Bénin

  const handleMarkerClick = useCallback((location: Location) => {
    onLocationSelect({
      latitude: location.latitude,
      longitude: location.longitude
    });
  }, [onLocationSelect]);

  return (
    <div className="h-[600px] w-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={[center.latitude, center.longitude]}
        zoom={7}
        className="h-full w-full"
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap'
        />
        {BENIN_LOCATIONS.map(location => (
          <WeatherMarker
            key={location.id}
            location={location}
            isSelected={
              selectedLocation?.latitude === location.latitude &&
              selectedLocation?.longitude === location.longitude
            }
            onClick={handleMarkerClick}
          />
        ))}
      </MapContainer>
    </div>
  );
};
