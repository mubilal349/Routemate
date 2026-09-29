import { ArrowRight, CalendarDays, MapPin, Plane, Users } from "lucide-react";
import { Link } from "react-router-dom";

import { useTrips } from "../../context/TripContext";

function UpcomingTrips() {
  const { trips } = useTrips();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingTrips = trips
    .filter((trip) => {
      if (!trip.startDate) {
        return false;
      }

      const startDate = new Date(`${trip.startDate}T00:00:00`);

      return startDate >= today;
    })
    .sort(
      (a, b) =>
        new Date(`${a.startDate}T00:00:00`) -
        new Date(`${b.startDate}T00:00:00`),
    )
    .slice(0, 4);

  const formatDate = (date) => {
    if (!date) {
      return "Date not set";
    }

    return new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
            <Plane size={20} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Upcoming Trips
            </h2>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Your next adventures
            </p>
          </div>
        </div>

        <Link
          to="/trips"
          className="inline-flex items-center gap-1 self-start text-sm font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 sm:self-auto"
        >
          View all
          <ArrowRight size={15} />
        </Link>
      </div>

      {/* Trips */}
      <div className="mt-6">
        {upcomingTrips.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {upcomingTrips.map((trip) => (
              <Link
                key={trip.id}
                to={`/trips/${trip.id}`}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:hover:border-blue-500/30"
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  {trip.coverImage ? (
                    <img
                      src={trip.coverImage}
                      alt={trip.destination || trip.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-700 text-white">
                      <Plane size={38} strokeWidth={1.5} />
                    </div>
                  )}

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="truncate text-base font-bold text-white">
                      {trip.title || "Untitled Trip"}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <MapPin size={15} className="text-blue-500" />

                    <span className="truncate">
                      {trip.destination || "Destination not set"}
                      {trip.country ? `, ${trip.country}` : ""}
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={15} className="text-slate-400" />

                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                          Starts
                        </p>

                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                          {formatDate(trip.startDate)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users size={15} className="text-slate-400" />

                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                          Travelers
                        </p>

                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                          {trip.travelers || 1}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 px-5 py-12 text-center dark:border-slate-800">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <Plane size={25} />
            </div>

            <h3 className="mt-4 text-sm font-bold text-slate-900 dark:text-white">
              No upcoming trips
            </h3>

            <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-slate-500 dark:text-slate-400">
              Your upcoming trips will appear here once you create a trip with a
              future start date.
            </p>

            <Link
              to="/trips/create"
              className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Create a trip
              <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default UpcomingTrips;
