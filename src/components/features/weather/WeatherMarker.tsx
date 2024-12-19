import { useCallback } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Location } from '@/core/types/weather';

interface WeatherMarkerProps {
  location: Location;
  isSelected: boolean;
  onClick: (location: Location) => void;
}

export const WeatherMarker = ({
  location,
  isSelected,
  onClick
}: WeatherMarkerProps) => {
  const handleClick = useCallback(() => {
    onClick(location);
  }, [location, onClick]);

  return (
    <Marker
      position={[location.latitude, location.longitude]}
      eventHandlers={{ click: handleClick }}
    >
      <Popup>
        <div className="p-2">
          <h3 className="font-bold">{location.name}</h3>
          {location.local_names && (
            <p className="text-sm text-gray-600">
              {Object.values(location.local_names)[0]}
            </p>
          )}
          <p className="text-sm mt-1">
            Département: {location.department}
          </p>
          <p className="text-sm">
            Région: {location.region.charAt(0).toUpperCase() + location.region.slice(1)}
          </p>
        </div>
      </Popup>
    </Marker>
  );
};
