import { Marker } from "react-leaflet";
import L from "leaflet";

import MapPopup from "./MapPopup";

function createMarkerIcon(selected = false) {
  return L.divIcon({
    className: "routemate-map-marker",
    html: `       <div
        style="
          width: ${selected ? "42px" : "36px"};
          height: ${selected ? "42px" : "36px"};
          border-radius: 9999px;
          background: ${selected ? "#0284c7" : "#ffffff"};
          border: 3px solid ${selected ? "#e0f2fe" : "#0284c7"};
          box-shadow: 0 8px 20px rgba(15, 23, 42, 0.22);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        "       >         <svg
          width="${selected ? "20" : "18"}"
          height="${selected ? "20" : "18"}"
          viewBox="0 0 24 24"
          fill="none"
          stroke="${selected ? "#ffffff" : "#0284c7"}"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"         >           <path d="M20 10c0 4.993-8 12-8 12S4 14.993 4 10a8 8 0 1 1 16 0Z"/>           <circle cx="12" cy="10" r="3"/>         </svg>       </div>
    `,
    iconSize: [42, 42],
    iconAnchor: [21, 42],
    popupAnchor: [0, -42],
  });
}

function MapMarker({ destination, selected, onSelect, onExplore }) {
  return (
    <Marker
      position={[destination.latitude, destination.longitude]}
      icon={createMarkerIcon(selected)}
      eventHandlers={{
        click: () => {
          onSelect(destination);
        },
      }}
    >
      {" "}
      <MapPopup destination={destination} onExplore={onExplore} />{" "}
    </Marker>
  );
}

export default MapMarker;
