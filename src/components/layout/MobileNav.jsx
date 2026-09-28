import {
  CalendarDays,
  DollarSign,
  LayoutDashboard,
  Map,
  Plane,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function MobileNav() {
  const navigation = [
    {
      label: "Home",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Trips",
      path: "/trips",
      icon: Plane,
    },
    {
      label: "Plan",
      path: "/itinerary",
      icon: CalendarDays,
    },
    {
      label: "Map",
      path: "/map",
      icon: Map,
    },
    {
      label: "Budget",
      path: "/budget",
      icon: DollarSign,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95 lg:hidden">
      <div className="mx-auto flex max-w-md items-center justify-around">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex min-w-14 flex-1 flex-col items-center gap-1 px-2 py-3 text-[10px] font-medium transition ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={19} strokeWidth={isActive ? 2.4 : 2} />

                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

export default MobileNav;
