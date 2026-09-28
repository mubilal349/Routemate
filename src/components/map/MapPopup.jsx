import { CalendarDays, MapPin, Star, Wallet } from "lucide-react";
import { Popup } from "react-leaflet";

function MapPopup({ destination, onExplore }) {
  return (
    <Popup minWidth={280} maxWidth={320}>
      {" "}
      <div className="overflow-hidden rounded-2xl">
        {" "}
        <img
          src={destination.image}
          alt={destination.name}
          className="h-36 w-full object-cover"
        />
        <div className="p-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {destination.name}
              </h3>

              <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                <MapPin size={13} />
                <span>{destination.country}</span>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-600">
              <Star size={12} fill="currentColor" />
              {destination.rating}
            </div>
          </div>

          <p className="mt-3 text-xs leading-5 text-slate-500">
            {destination.description}
          </p>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-slate-50 p-2.5">
              <div className="flex items-center gap-1.5 text-slate-400">
                <CalendarDays size={13} />

                <span className="text-[10px] font-semibold uppercase tracking-wide">
                  Best time
                </span>
              </div>

              <p className="mt-1 text-xs font-semibold text-slate-700">
                {destination.bestTime}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-2.5">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Wallet size={13} />

                <span className="text-[10px] font-semibold uppercase tracking-wide">
                  Daily
                </span>
              </div>

              <p className="mt-1 text-xs font-semibold text-slate-700">
                ${destination.averageBudget}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onExplore(destination)}
            className="mt-3 flex h-10 w-full items-center justify-center rounded-xl bg-sky-50 text-xs font-semibold text-blue-700 transition hover:bg-sky-100 hover:text-blue-800"
          >
            Explore Destination
          </button>
        </div>
      </div>
    </Popup>
  );
}

export default MapPopup;
