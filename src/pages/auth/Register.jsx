import {
  ArrowLeft,
  CalendarDays,
  MapPinned,
  Sparkles,
  WalletCards,
} from "lucide-react";
import { Link } from "react-router-dom";

import RegisterForm from "../../components/auth/RegisterForm";
import Logo from "../../components/common/Logo";

function Register() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left — Branding */}
        <div className="relative hidden overflow-hidden bg-slate-950 lg:flex">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-blue-700 to-sky-600" />

          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-sky-300/20 blur-3xl" />
          <div className="absolute -bottom-40 -right-20 h-[28rem] w-[28rem] rounded-full bg-indigo-300/20 blur-3xl" />

          <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">
            <Link
              to="/"
              className="inline-flex w-fit items-center gap-2 text-white"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg font-bold text-slate-950">
                R
              </span>

              <span className="text-xl font-bold tracking-tight">
                RouteMate
              </span>
            </Link>

            <div className="max-w-xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                <Sparkles size={16} />
                Start your journey
              </div>

              <h1 className="text-5xl font-bold leading-tight tracking-tight text-white xl:text-6xl">
                Plan your trip.
                <span className="block text-sky-200">Enjoy the journey.</span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-blue-100">
                Create a RouteMate account and bring your destinations,
                itinerary, activities, and travel budget together.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-sm text-white">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                    <MapPinned size={17} />
                  </span>
                  Organize your favorite destinations
                </div>

                <div className="flex items-center gap-3 text-sm text-white">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                    <CalendarDays size={17} />
                  </span>
                  Build day-by-day itineraries
                </div>

                <div className="flex items-center gap-3 text-sm text-white">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                    <WalletCards size={17} />
                  </span>
                  Track your travel budget
                </div>
              </div>
            </div>

            <p className="text-xs text-blue-200">
              Your next adventure starts here.
            </p>
          </div>
        </div>

        {/* Right — Register */}
        <div className="flex min-h-screen flex-col">
          <div className="flex items-center justify-between p-5 sm:p-8 lg:justify-end">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white lg:hidden"
            >
              <ArrowLeft size={16} />
              Back to home
            </Link>

            <div className="lg:hidden">
              <Logo />
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center px-5 pb-10 sm:px-8">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  Get started
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
                  Create your account
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Start planning smarter with RouteMate.
                </p>
              </div>

              <RegisterForm />

              <p className="mt-8 text-center text-xs leading-5 text-slate-400 dark:text-slate-500">
                By creating an account, you agree to RouteMate's terms and
                privacy policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
