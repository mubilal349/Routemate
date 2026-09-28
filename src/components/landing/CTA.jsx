import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Sparkles,
  WalletCards,
} from "lucide-react";
import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="px-5 pb-24 sm:px-8 lg:px-10">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 px-6 py-16 text-white shadow-2xl shadow-blue-900/20 sm:px-12 sm:py-20 lg:px-16">
        {/* Background decoration */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl" />

        {/* Decorative grid */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          {/* Content */}
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md">
              <Sparkles size={16} aria-hidden="true" />

              <span>Everything your trip needs</span>
            </div>

            {/* Heading */}
            <h2 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Your next adventure,
              <span className="block text-blue-100">planned in one place.</span>
            </h2>

            {/* Description */}
            <p className="mt-5 max-w-2xl text-base leading-7 text-blue-50 sm:text-lg">
              Create your trip, discover destinations, organize your itinerary,
              manage hotels and transportation, and keep your travel budget
              under control with RouteMate.
            </p>

            {/* CTA */}
            <div className="mt-8">
              <Link
                to="/register"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-semibold text-white shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-slate-900"
              >
                Start Planning
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Feature Preview */}
          <div className="hidden w-64 lg:block">
            <div className="rounded-3xl border border-white/15 bg-white/10 p-4 shadow-xl backdrop-blur-xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-blue-100">
                Your RouteMate trip
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
                    <MapPin size={17} />
                  </div>

                  <div>
                    <p className="text-xs text-blue-100">Destination</p>

                    <p className="text-sm font-semibold">
                      Choose your next place
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
                    <CalendarDays size={17} />
                  </div>

                  <div>
                    <p className="text-xs text-blue-100">Itinerary</p>

                    <p className="text-sm font-semibold">Organize every day</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
                    <WalletCards size={17} />
                  </div>

                  <div>
                    <p className="text-xs text-blue-100">Budget</p>

                    <p className="text-sm font-semibold">Track your spending</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
