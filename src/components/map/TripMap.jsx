import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

import MapMarker from "./MapMarker";

function MapController({ selectedDestination }) {
  const map = useMap();

  useEffect(() => {
    if (!selectedDestination) return;

    map.flyTo(
      [selectedDestination.latitude, selectedDestination.longitude],
      6,
      {
        duration: 1.2,
      },
    );
  }, [map, selectedDestination]);

  return null;
}

function TripMap({
  destinations = [],
  selectedDestination = null,
  onSelectDestination,
  onExploreDestination,
}) {
  const defaultCenter = [30.3753, 69.3451];

  return (
    <div className="relative min-h-[520px] overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <MapContainer
        center={
          selectedDestination
            ? [selectedDestination.latitude, selectedDestination.longitude]
            : defaultCenter
        }
        zoom={3}
        scrollWheelZoom={true}
        className="z-0 h-[520px] w-full"
      >
        {" "}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController selectedDestination={selectedDestination} />
        {destinations.map((destination) => (
          <MapMarker
            key={destination.id}
            destination={destination}
            selected={selectedDestination?.id === destination.id}
            onSelect={onSelectDestination}
            onExplore={onExploreDestination}
          />
        ))}
      </MapContainer>

      <div className="pointer-events-none absolute left-4 top-4 z-[1000] rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-md dark:border-slate-700/70 dark:bg-slate-900/90">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Explore Map
        </p>

        <p className="mt-0.5 text-sm font-bold text-slate-900 dark:text-white">
          Discover your next destination
        </p>
      </div>
    </div>
  );
}

export default TripMap;
