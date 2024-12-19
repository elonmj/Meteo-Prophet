import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export const MapComponent = () => {
  return (
    <div className="h-96 rounded-lg overflow-hidden">
      <MapContainer
        center={[9.3077, 2.3158]} // Centre du Bénin
        zoom={7}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        />
        {/* Marqueurs pour les villes principales */}
        <Marker position={[6.3654, 2.4183]} /> {/* Cotonou */}
        <Marker position={[9.3371, 2.6284]} /> {/* Parakou */}
        {/* Autres villes... */}
      </MapContainer>
    </div>
  )
}