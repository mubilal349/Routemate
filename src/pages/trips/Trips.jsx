import { useMemo, useState } from "react";
import { ArrowRight, Compass, Plus, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import TripFilters from "../../components/trips/TripFilters";
import TripGrid from "../../components/trips/TripGrid";
import { useTrips } from "../../context/TripContext";

function Trips() {
  const { trips } = useTrips();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const filteredTrips = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = trips.filter((trip) => {
      const matchesSearch =
        !query ||
        [trip.title, trip.destination, trip.country, trip.description].some(
          (value) =>
            String(value || "")
              .toLowerCase()
              .includes(query),
        );

      const matchesStatus = status === "all" || trip.status === status;

      return matchesSearch && matchesStatus;
    });

    return [...result].sort((a, b) => {
      if (sortBy === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }

      if (sortBy === "budget-high") {
        return Number(b.budget || 0) - Number(a.budget || 0);
      }

      if (sortBy === "budget-low") {
        return Number(a.budget || 0) - Number(b.budget || 0);
      }

      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [trips, search, status, sortBy]);

  const plannedTrips = trips.filter((trip) => trip.status === "planned").length;

  const completedTrips = trips.filter(
    (trip) => trip.status === "completed",
  ).length;

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="flex flex-col gap-6">
          {/* Page header */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 dark:bg-sky-500/10 dark:text-sky-400">
                <Compass size={14} />
                Your adventures
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                My Trips
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                Organize your adventures, manage your itineraries, and keep
                everything in one place.
              </p>
            </div>

            <Link
              to="/trips/create"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-sky-50 px-5 text-sm font-semibold text-blue-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-100 hover:text-blue-800 hover:shadow-md dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20 dark:hover:text-sky-300"
            >
              <Plus size={18} />
              Create New Trip
            </Link>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Total trips
              </p>
              <Link
                to="/trips/create"
                className="inline-flex shrink-0 items-center justify-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700 dark:text-sky-400 dark:hover:text-sky-300"
              >
                Start planning
                <ArrowRight size={16} />
              </Link>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                {trips.length}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Planned
              </p>

              <p className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-400">
                {plannedTrips}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Completed
              </p>

              <p className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {completedTrips}
              </p>
            </div>
          </div>

          {/* Filters */}
          <TripFilters
            search={search}
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          {/* Results */}
          <div>
            {filteredTrips.length > 0 && (
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Showing{" "}
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {filteredTrips.length}
                  </span>{" "}
                  {filteredTrips.length === 1 ? "trip" : "trips"}
                </p>
              </div>
            )}

            <TripGrid
              trips={filteredTrips}
              emptyTitle={
                trips.length === 0 ? "No trips yet" : "No matching trips"
              }
              emptyDescription={
                trips.length === 0
                  ? "Start planning your next adventure and your trips will appear here."
                  : "Try changing your search or filters to find a trip."
              }
            />
          </div>

          {/* Bottom inspiration */}
          {trips.length === 0 && (
            <div className="overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 p-6 dark:border-blue-900/30 dark:from-slate-900 dark:via-blue-950/30 dark:to-indigo-950/30 sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm dark:bg-slate-800 dark:text-blue-400">
                    <Sparkles size={21} />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900 dark:text-white">
                      Ready for your next adventure?
                    </h2>

                    <p className="mt-1 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                      Create a trip and start building your personalized travel
                      plan.
                    </p>
                  </div>
                </div>

                <Link
                  to="/trips/create"
                  className="inline-flex shrink-0 items-center justify-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700 dark:text-sky-400 dark:hover:text-sky-300"
                >
                  Start planning
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Trips;
