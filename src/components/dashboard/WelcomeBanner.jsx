import { ArrowRight, Plane, Plus } from "lucide-react";
import { Link } from "react-router-dom";

function WelcomeBanner({ user }) {
  return (
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
            Plan your next adventure, organize your itinerary, and keep every
            travel detail in one place.
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
            <Plane size={54} strokeWidth={1.5} className="rotate-[-15deg]" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default WelcomeBanner;
