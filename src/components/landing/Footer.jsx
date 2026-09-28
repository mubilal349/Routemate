import { ArrowUpRight, Mail, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

import Logo from "../common/Logo";

function Footer() {
  const currentYear = new Date().getFullYear();

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (event) => {
    event.preventDefault();

    if (!email.trim()) {
      return;
    }

    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        {/* Main Footer */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 — Brand */}
          <div>
            <Logo />

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-500 dark:text-slate-400">
              RouteMate helps you discover destinations, build itineraries,
              organize activities, manage travel expenses, and keep your entire
              journey in one place.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="X / Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-sm font-bold text-slate-500 transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:bg-slate-900 dark:hover:text-white"
              >
                𝕏
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-sm font-bold text-slate-500 transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:bg-slate-900 dark:hover:text-white"
              >
                in
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-sm font-bold text-slate-500 transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:bg-slate-900 dark:hover:text-white"
              >
                ◎
              </a>
            </div>
          </div>

          {/* Column 2 — Product */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Product
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="#features"
                  className="text-sm text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  Features
                </a>
              </li>

              <li>
                <Link
                  to="/trips"
                  className="text-sm text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  My Trips
                </Link>
              </li>

              <li>
                <Link
                  to="/itinerary"
                  className="text-sm text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  Itinerary Planner
                </Link>
              </li>

              <li>
                <Link
                  to="/budget"
                  className="text-sm text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  Budget Tracker
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Explore */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Explore
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="#how-it-works"
                  className="text-sm text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  How It Works
                </a>
              </li>

              <li>
                <Link
                  to="/saved-trips"
                  className="text-sm text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  Saved Trips
                </Link>
              </li>

              <li>
                <Link
                  to="/hotels"
                  className="text-sm text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  Hotels
                </Link>
              </li>

              <li>
                <Link
                  to="/transport"
                  className="text-sm text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  Transportation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 — Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Stay in the loop
            </h3>

            <p className="mt-5 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Subscribe to get travel inspiration, planning tips, and RouteMate
              updates.
            </p>

            {subscribed ? (
              <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/10">
                <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                  You're subscribed!
                </p>

                <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-500">
                  Thanks for joining the RouteMate community.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-5">
                <div className="relative">
                  <Mail
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Your email address"
                    required
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-blue-400"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
                >
                  Subscribe
                  <Send size={15} />
                </button>
              </form>
            )}

            <Link
              to="/register"
              className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Start planning your trip
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {currentYear} RouteMate. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <a
              href="#"
              className="text-sm text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              Privacy
            </a>

            <a
              href="#"
              className="text-sm text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
