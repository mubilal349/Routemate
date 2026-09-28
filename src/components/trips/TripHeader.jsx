import { ArrowLeft, CalendarDays, MapPin, Pencil, Users } from "lucide-react";
import { Link } from "react-router-dom";

function TripHeader({ trip }) {
  if (!trip) {
    return null;
  }

  const formatDate = (date) => {
    if (!date) {
      return "Date not set";
    }

    const parsedDate = new Date(`${date}T00:00:00`);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const startDate = formatDate(trip.startDate);
  const endDate = formatDate(trip.endDate);

  return (
    <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/trips"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to My Trips
          </Link>
        </div>

        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            {/* Status */}
            <div className="mb-4">
              <span
                className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ${
                  trip.status === "completed"
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                    : "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400"
                }`}
              >
                {trip.status === "completed" ? "Completed" : "Planned"}
              </span>
            </div>

            {/* Title */}
            <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              {trip.title || "Untitled Trip"}
            </h1>

            {/* Destination */}
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
              {trip.destination && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin
                    size={16}
                    className="text-sky-600 dark:text-sky-400"
                  />
                  {trip.destination}
                  {trip.country && `, ${trip.country}`}
                </span>
              )}

              <span className="inline-flex items-center gap-1.5">
                <CalendarDays
                  size={16}
                  className="text-sky-600 dark:text-sky-400"
                />
                {startDate} – {endDate}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <Users size={16} className="text-sky-600 dark:text-sky-400" />
                {trip.travelers || 1}{" "}
                {Number(trip.travelers) === 1 ? "traveler" : "travelers"}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <Link
              to={`/trips/${trip.id}/edit`}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-sky-50 px-5 text-sm font-semibold text-blue-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-100 hover:text-blue-800 hover:shadow-md dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20 dark:hover:text-sky-300"
            >
              <Pencil size={16} />
              Edit Trip
            </Link>

            <Link
              to={`/itinerary?trip=${trip.id}`}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-sky-50 px-5 text-sm font-semibold text-blue-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-100 hover:text-blue-800 hover:shadow-md dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20 dark:hover:text-sky-300"
            >
              Plan Itinerary
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TripHeader;
