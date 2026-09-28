import { ArrowLeft, MapPinned, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import TripForm from "../../components/trips/TripForm";

function CreateTrip() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="mb-6">
          <Link
            to="/trips"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to My Trips
          </Link>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {/* Header */}
          <div className="relative overflow-hidden border-b border-slate-200 px-6 py-8 sm:px-8 dark:border-slate-800">
            <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="absolute -bottom-24 left-1/3 h-52 w-52 rounded-full bg-sky-500/10 blur-3xl" />

            <div className="relative flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <MapPinned size={22} />
              </div>

              <div>
                <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  <Sparkles size={13} />
                  Trip planner
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                  Create a new trip
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Add the basics of your trip now. You can build your itinerary,
                  hotels, transport, and budget after creating it.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8">
            <TripForm />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CreateTrip;
