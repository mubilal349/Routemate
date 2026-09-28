import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Plane,
  Plus,
  WalletCards,
} from "lucide-react";
import { Link } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* Welcome */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 p-6 text-white shadow-xl shadow-blue-900/10 sm:p-8">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-sky-300/10 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-blue-100">
                Welcome back, {user?.name?.split(" ")[0] || "Traveler"} 👋
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Where will you go next?
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
                Plan your next adventure, organize your itinerary, and keep
                every travel detail in one place.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/trips/create"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-sky-50 px-5 text-sm font-semibold text-blue-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-100 hover:text-blue-800 hover:shadow-md dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20 dark:hover:text-sky-300"
                >
                  <Plus size={17} />
                  Create New Trip
                </Link>

                <Link
                  to="/trips"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
                >
                  View My Trips
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="hidden shrink-0 lg:block">
              <div className="flex h-32 w-32 items-center justify-center rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl">
                <Plane
                  size={54}
                  strokeWidth={1.5}
                  className="rotate-[-15deg]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <Plane size={20} />
              </div>

              <span className="text-xs font-medium text-slate-400">Total</span>
            </div>

            <p className="mt-5 text-3xl font-bold text-slate-950 dark:text-white">
              0
            </p>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Trips planned
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <MapPin size={20} />
              </div>

              <span className="text-xs font-medium text-slate-400">Saved</span>
            </div>

            <p className="mt-5 text-3xl font-bold text-slate-950 dark:text-white">
              0
            </p>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Destinations
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                <CalendarDays size={20} />
              </div>

              <span className="text-xs font-medium text-slate-400">
                Planned
              </span>
            </div>

            <p className="mt-5 text-3xl font-bold text-slate-950 dark:text-white">
              0
            </p>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Activities
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                <WalletCards size={20} />
              </div>

              <span className="text-xs font-medium text-slate-400">
                This month
              </span>
            </div>

            <p className="mt-5 text-3xl font-bold text-slate-950 dark:text-white">
              $0
            </p>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Travel expenses
            </p>
          </div>
        </section>

        {/* Empty state */}
        <section className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900 sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            <Plane size={28} />
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-950 dark:text-white">
            Your next adventure starts here
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
            You don't have any trips yet. Create your first trip and start
            building your perfect itinerary.
          </p>

          <Link
            to="/trips/create"
            className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Plus size={17} />
            Create Your First Trip
          </Link>
        </section>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
