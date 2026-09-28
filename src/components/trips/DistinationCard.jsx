import { ArrowRight, Heart, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

function DestinationCard({ destination }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className="relative h-56 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <button
          type="button"
          aria-label={`Save ${destination.name}`}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-lg backdrop-blur transition hover:scale-105 hover:text-rose-500 dark:bg-slate-900/90 dark:text-slate-200"
        >
          <Heart size={18} />
        </button>

        {destination.popular && (
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-800 backdrop-blur dark:bg-slate-900/90 dark:text-white">
            Popular
          </span>
        )}

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-1.5 text-sm text-white/80">
            <MapPin size={14} />
            {destination.country}
          </div>

          <h3 className="mt-1 text-xl font-bold text-white">
            {destination.name}
          </h3>
        </div>
      </div>

      <div className="p-5">
        <p className="line-clamp-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          {destination.description}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">
            {destination.region}
          </span>

          <Link
            to={`/trips/create?destination=${encodeURIComponent(
              destination.name,
            )}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Plan trip
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default DestinationCard;
