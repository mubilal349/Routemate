import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  MapPin,
  Plane,
  Sparkles,
  WalletCards,
} from "lucide-react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-sky-200/40 blur-3xl dark:bg-sky-500/10" />

        <div className="absolute -right-20 top-52 h-96 w-96 rounded-full bg-indigo-200/30 blur-3xl dark:bg-indigo-500/10" />

        <div className="absolute -left-20 top-[32rem] h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl dark:bg-cyan-500/10" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 sm:px-8 lg:grid-cols-2 lg:px-10 lg:pb-28">
        {/* Left Content */}
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
            <Sparkles size={16} className="text-sky-500" aria-hidden="true" />

            <span>Smart trip planning made simple</span>
          </div>

          {/* Heading */}
          <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
            Plan less.
            <span className="block bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Travel more.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            RouteMate brings your entire journey into one beautiful workspace.
            Discover destinations, build day-by-day itineraries, organize
            activities, manage your budget, and keep every travel detail in one
            place.
          </p>

          {/* CTA Buttons */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-blue-600/30 sm:w-auto"
            >
              Start Planning
              <ArrowRight size={17} aria-hidden="true" />
            </Link>

            <a
              href="#how-it-works"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 sm:w-auto"
            >
              See How It Works
            </a>
          </div>

          {/* Benefits */}
          <div className="mt-10 grid gap-4 text-sm text-slate-600 dark:text-slate-400 sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <CheckCircle2
                size={17}
                className="shrink-0 text-emerald-500"
                aria-hidden="true"
              />
              <span>Plan every day</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin
                size={17}
                className="shrink-0 text-sky-500"
                aria-hidden="true"
              />
              <span>Explore destinations</span>
            </div>

            <div className="flex items-center gap-2">
              <WalletCards
                size={17}
                className="shrink-0 text-indigo-500"
                aria-hidden="true"
              />
              <span>Track your budget</span>
            </div>
          </div>
        </div>

        {/* Right Visual */}
        <div className="relative lg:pl-4">
          {/* Glow */}
          <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-sky-400/20 via-blue-500/10 to-indigo-500/20 blur-2xl" />

          {/* Main Card */}
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-900/10 dark:border-white/10 dark:bg-slate-900">
            {/* Image */}
            <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-100 dark:bg-slate-800">
              <img
                src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85"
                alt="Beautiful travel destination"
                className="h-[430px] w-full object-cover sm:h-[500px]"
              />

              {/* Image gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            </div>

            {/* Trip Preview Card */}
            <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/20 bg-white/90 p-4 shadow-xl backdrop-blur-xl dark:bg-slate-950/90">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-semibold tracking-wider text-sky-600 dark:text-sky-400">
                    YOUR NEXT ADVENTURE
                  </p>

                  <h3 className="mt-1 truncate text-lg font-bold text-slate-950 dark:text-white">
                    Build your perfect trip
                  </h3>

                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <CalendarDays size={14} />
                    <span>Plan every detail in one place</span>
                  </div>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-500 text-white shadow-lg shadow-sky-500/20">
                  <Plane size={20} aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>

          {/* Floating Destination Card */}
          <div className="absolute -left-5 top-10 hidden rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-xl backdrop-blur-xl sm:block dark:border-white/10 dark:bg-slate-900/95">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
                <MapPin size={18} />
              </div>

              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Destination
                </p>

                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Your next stop
                </p>
              </div>
            </div>
          </div>

          {/* Floating Budget Card */}
          <div className="absolute -right-5 bottom-20 hidden rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-xl backdrop-blur-xl sm:block dark:border-white/10 dark:bg-slate-900/95">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                <WalletCards size={18} />
              </div>

              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Budget
                </p>

                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Stay on track
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
