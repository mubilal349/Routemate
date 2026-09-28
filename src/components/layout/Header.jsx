import { Bell, ChevronDown, Menu, Moon, Search, Sun } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

function Header({ onMenuClick }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90 sm:px-6 lg:px-8">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white lg:hidden"
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>

        <div className="hidden md:block">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            Plan your next adventure
          </p>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Everything you need for your journey.
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search */}
        <button
          type="button"
          className="hidden h-10 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-400 transition hover:border-slate-300 hover:text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:text-slate-200 sm:flex"
        >
          <Search size={17} />
          <span>Search</span>
          <kbd className="ml-4 rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] dark:border-slate-700 dark:bg-slate-800">
            ⌘ K
          </kbd>
        </button>

        {/* Theme */}
        <button
          type="button"
          onClick={toggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* Notifications */}
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
          aria-label="Notifications"
        >
          <Bell size={18} />

          <span className="absolute right-2.5 top-2 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white dark:ring-slate-950" />
        </button>

        {/* User */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowMenu((current) => !current)}
            className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-slate-100 dark:hover:bg-slate-900"
            aria-label="Open user menu"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <ChevronDown size={15} className="hidden text-slate-400 sm:block" />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-12 w-52 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900">
              <div className="border-b border-slate-100 px-3 py-3 dark:border-slate-800">
                <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                  {user?.name || "RouteMate User"}
                </p>

                <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                  {user?.email}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowMenu(false);
                  navigate("/settings");
                }}
                className="mt-1 w-full rounded-xl px-3 py-2.5 text-left text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                Account settings
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
