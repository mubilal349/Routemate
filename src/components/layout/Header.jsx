import {
  Bell,
  CalendarDays,
  CheckCheck,
  ChevronDown,
  CircleDollarSign,
  Hotel,
  Menu,
  Moon,
  Plane,
  Search,
  Sun,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useNotifications } from "../../context/NotificationContext";
import { useTheme } from "../../context/ThemeContext";

function Header({ onMenuClick }) {
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotifications();

  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);

    setShowNotifications(false);

    if (notification.link) {
      navigate(notification.link);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "trip":
        return Plane;

      case "hotel":
        return Hotel;

      case "activity":
        return CalendarDays;

      case "expense":
        return CircleDollarSign;

      default:
        return Bell;
    }
  };

  const getNotificationIconClass = (type) => {
    switch (type) {
      case "trip":
        return "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400";

      case "hotel":
        return "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400";

      case "activity":
        return "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400";

      case "expense":
        return "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400";

      default:
        return "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400";
    }
  };

  const formatNotificationTime = (date) => {
    if (!date) {
      return "Recently";
    }

    const value = new Date(date);

    if (Number.isNaN(value.getTime())) {
      return "Recently";
    }

    return value.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
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
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications((current) => !current)}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
            aria-label={`Notifications${
              unreadCount > 0 ? `, ${unreadCount} unread` : ""
            }`}
            aria-expanded={showNotifications}
          >
            <Bell size={18} />

            {unreadCount > 0 && (
              <>
                <span className="absolute right-2.5 top-2 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white dark:ring-slate-950" />

                <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold leading-none text-white ring-2 ring-white dark:ring-slate-950">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              </>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-12 z-50 w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Notifications
                  </h3>

                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    {unreadCount > 0
                      ? `${unreadCount} unread notification${
                          unreadCount > 1 ? "s" : ""
                        }`
                      : "You're all caught up"}
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={markAllAsRead}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                      title="Mark all as read"
                      aria-label="Mark all as read"
                    >
                      <CheckCheck size={17} />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setShowNotifications(false)}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
                    aria-label="Close notifications"
                  >
                    <X size={17} />
                  </button>
                </div>
              </div>

              {/* Notification List */}
              <div className="max-h-[420px] overflow-y-auto">
                {notifications.length > 0 ? (
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {notifications.slice(0, 8).map((notification) => {
                      const Icon = getNotificationIcon(notification.type);

                      return (
                        <button
                          key={notification.id}
                          type="button"
                          onClick={() => handleNotificationClick(notification)}
                          className={`flex w-full items-start gap-3 p-4 text-left transition hover:bg-slate-50 dark:hover:bg-slate-950 ${
                            !notification.isRead
                              ? "bg-blue-50/40 dark:bg-blue-500/[0.03]"
                              : ""
                          }`}
                        >
                          {/* Icon */}
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${getNotificationIconClass(
                              notification.type,
                            )}`}
                          >
                            <Icon size={17} />
                          </div>

                          {/* Content */}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                {notification.title}
                              </p>

                              {!notification.isRead && (
                                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                              )}
                            </div>

                            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                              {notification.message}
                            </p>

                            <p className="mt-1.5 text-[11px] text-slate-400 dark:text-slate-500">
                              {formatNotificationTime(notification.createdAt)}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="px-6 py-10 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
                      <Bell size={21} />
                    </div>

                    <h4 className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">
                      No notifications
                    </h4>

                    <p className="mx-auto mt-1 max-w-xs text-xs leading-5 text-slate-500 dark:text-slate-400">
                      Notifications about your trips, hotels, activities, and
                      expenses will appear here.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="border-t border-slate-200 p-3 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      setShowNotifications(false);
                      navigate("/activity");
                    }}
                    className="flex w-full items-center justify-center rounded-xl px-3 py-2.5 text-xs font-semibold text-blue-600 transition hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/10"
                  >
                    View all activity
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

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
