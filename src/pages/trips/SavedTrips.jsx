import { ArrowLeft, Bookmark, Compass, Plus } from "lucide-react";
import { Link } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import TripGrid from "../../components/trips/TripGrid";
import { useTrips } from "../../context/TripContext";

function SavedTrips() {
  const { savedTrips } = useTrips();

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* Back link */}
        <div className="mb-6">
          <Link
            to="/trips"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to My Trips
          </Link>
        </div>

        {/* Page header */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 dark:bg-sky-500/10 dark:text-sky-400">
                <Bookmark size={14} />
                Saved collection
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                Saved Trips
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                Keep your favorite trips close and come back to them whenever
                you're ready to travel.
              </p>
            </div>

            <Link
              to="/trips/create"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              <Plus size={18} />
              Create Trip
            </Link>
          </div>

          {/* Saved trips summary */}
          {savedTrips.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
                  <Compass size={19} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {savedTrips.length} saved{" "}
                    {savedTrips.length === 1 ? "trip" : "trips"}
                  </p>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Your bookmarked adventures
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Saved trips */}
          <TripGrid
            trips={savedTrips}
            emptyTitle="No saved trips"
            emptyDescription="Save a trip by clicking the heart icon on any trip card."
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default SavedTrips;
