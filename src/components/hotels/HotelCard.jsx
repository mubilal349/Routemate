import {
  BedDouble,
  Check,
  Coffee,
  Dumbbell,
  MapPin,
  ParkingCircle,
  Star,
  Waves,
} from "lucide-react";

const amenityIcons = {
  "Free WiFi": BedDouble,
  Breakfast: Coffee,
  Pool: Waves,
  Gym: Dumbbell,
  Parking: ParkingCircle,
};

function HotelCard({ hotel, onSelect, selected = false }) {
  return (
    <article
      className={`group overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-900 ${
        selected
          ? "border-sky-400 ring-2 ring-sky-400/20 dark:border-sky-500"
          : "border-slate-200 dark:border-slate-800"
      }`}
    >
      {/* Image */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/10" />

        {/* Rating */}
        <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-800 shadow-lg backdrop-blur">
          <Star size={14} className="fill-amber-400 text-amber-400" />
          {hotel.rating}
        </div>

        {/* Selected badge */}
        {selected && (
          <div className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-sky-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
            <Check size={14} />
            Selected
          </div>
        )}

        {/* Bottom image content */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-white/80">
                {hotel.city}, {hotel.country}
              </p>

              <h3 className="mt-1 text-lg font-bold text-white">
                {hotel.name}
              </h3>
            </div>

            <div className="shrink-0 rounded-xl bg-white/95 px-3 py-2 text-right shadow-lg">
              <p className="text-lg font-bold leading-none text-slate-900">
                ${hotel.pricePerNight}
              </p>

              <p className="mt-1 text-[10px] font-medium text-slate-500">
                / night
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Location + reviews */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
            <MapPin size={15} className="shrink-0 text-sky-500" />

            <span className="truncate">{hotel.location}</span>
          </div>

          <span className="shrink-0 text-xs font-medium text-slate-400">
            {hotel.reviews} reviews
          </span>
        </div>

        {/* Description */}
        <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          {hotel.description}
        </p>

        {/* Amenities */}
        <div className="mt-4 flex flex-wrap gap-2">
          {hotel.amenities.slice(0, 4).map((amenity) => {
            const Icon = amenityIcons[amenity] || BedDouble;

            return (
              <span
                key={amenity}
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300"
              >
                <Icon size={12} />
                {amenity}
              </span>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between gap-4 border-t border-slate-100 pt-5 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-1.5">
              <Star size={14} className="fill-amber-400 text-amber-400" />

              <span className="text-sm font-bold text-slate-900 dark:text-white">
                {hotel.rating}
              </span>

              <span className="text-xs text-slate-400">/ 5</span>
            </div>

            <p className="mt-1 text-xs text-slate-400">
              {hotel.reviews} verified reviews
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSelect(hotel)}
            className={`inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition-all duration-200 ${
              selected
                ? "bg-sky-100 text-blue-700 hover:bg-sky-200 dark:bg-sky-500/15 dark:text-sky-400 dark:hover:bg-sky-500/20"
                : "bg-sky-50 text-blue-700 shadow-sm hover:-translate-y-0.5 hover:bg-sky-100 hover:text-blue-800 hover:shadow-md dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20 dark:hover:text-sky-300"
            }`}
          >
            {selected ? (
              <>
                <Check size={16} />
                Selected
              </>
            ) : (
              <>
                <BedDouble size={16} />
                Select Hotel
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

export default HotelCard;
