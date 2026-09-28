import {
  CalendarDays,
  Compass,
  DollarSign,
  Hotel,
  LayoutDashboard,
  Map,
  Plane,
  Settings,
  Truck,
  X,
} from "lucide-react";
import { NavLink, Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

function Sidebar({ isOpen = true, onClose }) {
  const { user } = useAuth();

  const navigation = [
    {
      label: "Overview",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "My Trips",
      path: "/trips",
      icon: Plane,
    },
    {
      label: "Itinerary",
      path: "/itinerary",
      icon: CalendarDays,
    },
    {
      label: "Explore Map",
      path: "/map",
      icon: Map,
    },
    {
      label: "Hotels",
      path: "/hotels",
      icon: Hotel,
    },
    {
      label: "Transport",
      path: "/transport",
      icon: Truck,
    },
    {
      label: "Budget",
      path: "/budget",
      icon: DollarSign,
    },
  ];

  const secondaryNavigation = [
    {
      label: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <>
      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <aside
        className={`
          z-50 flex h-screen w-72 shrink-0 flex-col
          border-r border-slate-200 bg-white
          transition-transform duration-300
          dark:border-slate-800 dark:bg-slate-950

          lg:sticky lg:top-0 lg:h-screen lg:w-64

          fixed inset-y-0 left-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}

          lg:translate-x-0
        `}
      >
        {/* =====================================================
            LOGO
        ====================================================== */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-slate-200 px-5 dark:border-slate-800">
          <Link
            to="/dashboard"
            onClick={onClose}
            className="flex min-w-0 items-center gap-3"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-lg font-bold text-white dark:bg-white dark:text-slate-950">
              R
            </span>

            <div className="min-w-0">
              <p className="truncate text-lg font-bold tracking-tight text-slate-950 dark:text-white">
                RouteMate
              </p>

              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                Travel planner
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-900 dark:hover:text-white lg:hidden"
            aria-label="Close navigation"
          >
            <X size={19} />
          </button>
        </div>

        {/* =====================================================
            USER
        ====================================================== */}
        <div className="shrink-0 border-b border-slate-200 p-4 dark:border-slate-800">
          <div className="flex min-w-0 items-center gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-900">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                {user?.name || "RouteMate User"}
              </p>

              <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                {user?.email || "Traveler"}
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            NAVIGATION
        ====================================================== */}
        <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-5">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
            Workspace
          </p>

          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
                    }`
                  }
                >
                  <Icon size={18} strokeWidth={2} />

                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>

          <div className="my-6 border-t border-slate-200 dark:border-slate-800" />

          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
            Account
          </p>

          <div className="space-y-1">
            {secondaryNavigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
                    }`
                  }
                >
                  <Icon size={18} />

                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* =====================================================
            BOTTOM TIP
        ====================================================== */}
        <div className="shrink-0 p-4">
          <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-4 text-white">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
              <Compass size={18} />
            </div>

            <p className="text-sm font-semibold">
              Ready for your next adventure?
            </p>

            <p className="mt-1 text-xs leading-5 text-blue-100">
              Create a trip and start planning every detail.
            </p>

            <Link
              to="/trips/create"
              onClick={onClose}
              className="mt-3 inline-flex text-xs font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
            >
              Create a trip
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
