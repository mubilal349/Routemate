import {
  CalendarDays,
  Heart,
  MapPin,
  MoreHorizontal,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useTrips } from "../../context/TripContext";

function formatDate(dateString) {
  if (!dateString) {
    return "Date not set";
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Date not set";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function TripCard({ trip }) {
  const { toggleSavedTrip } = useTrips();

  const totalExpenses = trip.expenses?.reduce(
    (total, expense) => total + Number(expense.amount || 0),
    0,
  );

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-black/20">
      <div className="relative h-52 overflow-hidden">
        {trip.coverImage ? (
          <img
            src={trip.coverImage}
            alt={trip.destination}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600">
            <MapPin size={42} className="text-white/90" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        <button
          type="button"
          onClick={() => toggleSavedTrip(trip.id)}
          aria-label={trip.isSaved ? "Remove from saved trips" : "Save trip"}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-lg backdrop-blur transition hover:scale-105 dark:bg-slate-900/90 dark:text-slate-200"
        >
          <Heart
            size={18}
            fill={trip.isSaved ? "currentColor" : "none"}
            className={
              trip.isSaved
                ? "text-rose-500"
                : "text-slate-600 dark:text-slate-300"
            }
          />
        </button>

        <div className="absolute bottom-4 left-4">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 backdrop-blur dark:bg-slate-900/90 dark:text-white">
            {trip.status === "completed" ? "Completed" : "Planned"}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-bold text-slate-900 dark:text-white">
              {trip.title}
            </h3>

            <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
              <MapPin size={15} />
              <span className="truncate">
                {trip.destination || "Destination not set"}
                {trip.country ? `, ${trip.country}` : ""}
              </span>
            </div>
          </div>

          <button
            type="button"
            aria-label="Trip options"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <MoreHorizontal size={18} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 border-y border-slate-100 py-4 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <CalendarDays size={16} className="text-blue-500" />

            <div>
              <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                Dates
              </p>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                {formatDate(trip.startDate)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Users size={16} className="text-blue-500" />

            <div>
              <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                Travelers
              </p>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                {trip.travelers || 1}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs text-slate-400">Budget</p>

            <p className="text-lg font-bold text-slate-900 dark:text-white">
              ${Number(trip.budget || 0).toLocaleString()}
            </p>

            {totalExpenses > 0 && (
              <p className="mt-0.5 text-xs text-slate-500">
                ${totalExpenses.toLocaleString()} spent
              </p>
            )}
          </div>

          <Link
            to={`/trips/${trip.id}`}
            className="inline-flex items-center justify-center rounded-xl bg-sky-50 px-4 py-2.5 text-sm font-semibold text-blue-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-100 hover:text-blue-800 hover:shadow-md dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20 dark:hover:text-sky-300"
          >
            View Trip
          </Link>
        </div>
      </div>
    </article>
  );
}

export default TripCard;
