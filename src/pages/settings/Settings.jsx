import {
  Bell,
  Check,
  ChevronRight,
  CircleDollarSign,
  LogOut,
  Moon,
  Palette,
  Save,
  Settings as SettingsIcon,
  Shield,
  Sun,
  Trash2,
  User,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useTrips } from "../../context/TripContext";

const CURRENCIES = [
  { value: "USD", label: "US Dollar ($)" },
  { value: "EUR", label: "Euro (€)" },
  { value: "GBP", label: "British Pound (£)" },
  { value: "PKR", label: "Pakistani Rupee (₨)" },
];

function Settings() {
  const navigate = useNavigate();

  const { theme, toggleTheme } = useTheme();
  const { trips } = useTrips();
  const { user, logout } = useAuth();

  const [activeSection, setActiveSection] = useState("profile");

  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem("routemate-profile");

      return saved
        ? JSON.parse(saved)
        : {
            name: user?.name || "Traveler",
            email: user?.email || "",
          };
    } catch {
      return {
        name: user?.name || "Traveler",
        email: user?.email || "",
      };
    }
  });

  const [preferences, setPreferences] = useState(() => {
    try {
      const saved = localStorage.getItem("routemate-preferences");

      return saved
        ? JSON.parse(saved)
        : {
            currency: "USD",
            travelers: 1,
            notifications: true,
            tripReminders: true,
            budgetAlerts: true,
          };
    } catch {
      return {
        currency: "USD",
        travelers: 1,
        notifications: true,
        tripReminders: true,
        budgetAlerts: true,
      };
    }
  });

  const [savedMessage, setSavedMessage] = useState("");

  const handleProfileChange = (field, value) => {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handlePreferenceChange = (field, value) => {
    setPreferences((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const saveSettings = () => {
    localStorage.setItem("routemate-profile", JSON.stringify(profile));

    localStorage.setItem("routemate-preferences", JSON.stringify(preferences));

    setSavedMessage("Settings saved successfully.");

    window.setTimeout(() => {
      setSavedMessage("");
    }, 2500);
  };

  const handleClearTrips = () => {
    const confirmed = window.confirm(
      "This will permanently remove all locally saved trips, itineraries, expenses, hotel bookings, and transport bookings. Continue?",
    );

    if (!confirmed) return;

    localStorage.removeItem("routemate-trips");
    localStorage.removeItem("routemate-itineraries");

    window.location.reload();
  };

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");

    if (!confirmed) return;

    logout();
    navigate("/login", { replace: true });
  };

  const sections = [
    {
      id: "profile",
      label: "Profile",
      description: "Manage your personal information",
      icon: User,
    },
    {
      id: "preferences",
      label: "Preferences",
      description: "Customize your travel experience",
      icon: SettingsIcon,
    },
    {
      id: "appearance",
      label: "Appearance",
      description: "Control your theme and display",
      icon: Palette,
    },
    {
      id: "notifications",
      label: "Notifications",
      description: "Manage your notification preferences",
      icon: Bell,
    },
    {
      id: "privacy",
      label: "Privacy & Data",
      description: "Manage your local RouteMate data",
      icon: Shield,
    },
  ];

  return (
    <DashboardLayout>
      <div className="w-full min-w-0 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto w-full min-w-0 max-w-[1400px] space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-blue-700 dark:bg-sky-500/10 dark:text-sky-400">
                <SettingsIcon size={21} />
              </div>

              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-sky-400">
                  Account settings
                </p>

                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                  Settings
                </h1>
              </div>
            </div>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              Manage your profile, travel preferences, appearance,
              notifications, and RouteMate data.
            </p>
          </div>

          {/* Success message */}
          {savedMessage && (
            <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
              <Check size={18} />
              {savedMessage}
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
            {/* Sidebar */}
            <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-slate-900">
              <div className="mb-3 px-3 py-2">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
                  Settings
                </p>
              </div>

              <nav className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  const active = activeSection === section.id;

                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => setActiveSection(section.id)}
                      className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${
                        active
                          ? "bg-sky-50 text-blue-700 dark:bg-sky-500/10 dark:text-sky-400"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
                      }`}
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                          active
                            ? "bg-white text-blue-700 shadow-sm dark:bg-slate-800 dark:text-sky-400"
                            : "bg-slate-100 dark:bg-slate-800"
                        }`}
                      >
                        <Icon size={17} />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold">
                          {section.label}
                        </span>

                        <span className="mt-0.5 block truncate text-xs text-slate-400 dark:text-slate-500">
                          {section.description}
                        </span>
                      </span>

                      <ChevronRight size={16} className="shrink-0 opacity-50" />
                    </button>
                  );
                })}
              </nav>

              <div className="mt-4 border-t border-slate-100 pt-4 dark:border-white/10">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 dark:bg-red-500/10">
                    <LogOut size={17} />
                  </span>

                  <span className="text-sm font-semibold">Log out</span>
                </button>
              </div>
            </aside>

            {/* Content */}
            <main className="min-w-0">
              {/* Profile */}
              {activeSection === "profile" && (
                <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900 sm:p-7">
                  <div className="border-b border-slate-100 pb-6 dark:border-white/10">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      Profile information
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Update the information associated with your RouteMate
                      profile.
                    </p>
                  </div>

                  <div className="mt-7 grid gap-6 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Full name
                      </label>

                      <input
                        type="text"
                        value={profile.name}
                        onChange={(event) =>
                          handleProfileChange("name", event.target.value)
                        }
                        placeholder="Your name"
                        className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-500/10 dark:border-white/10 dark:bg-slate-950 dark:text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Email address
                      </label>

                      <input
                        type="email"
                        value={profile.email}
                        onChange={(event) =>
                          handleProfileChange("email", event.target.value)
                        }
                        placeholder="you@example.com"
                        className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-500/10 dark:border-white/10 dark:bg-slate-950 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="mt-7 flex justify-end">
                    <button
                      type="button"
                      onClick={saveSettings}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-sky-50 px-5 text-sm font-semibold text-blue-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-100 hover:text-blue-800 hover:shadow-md dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20 dark:hover:text-sky-300"
                    >
                      <Save size={17} />
                      Save changes
                    </button>
                  </div>
                </section>
              )}

              {/* Preferences */}
              {activeSection === "preferences" && (
                <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900 sm:p-7">
                  <div className="border-b border-slate-100 pb-6 dark:border-white/10">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      Travel preferences
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Set defaults used throughout your trip planning
                      experience.
                    </p>
                  </div>

                  <div className="mt-7 space-y-6">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Default currency
                      </label>

                      <div className="relative">
                        <CircleDollarSign
                          size={18}
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <select
                          value={preferences.currency}
                          onChange={(event) =>
                            handlePreferenceChange(
                              "currency",
                              event.target.value,
                            )
                          }
                          className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-medium text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-500/10 dark:border-white/10 dark:bg-slate-950 dark:text-white"
                        >
                          {CURRENCIES.map((currency) => (
                            <option key={currency.value} value={currency.value}>
                              {currency.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Default travelers
                      </label>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            handlePreferenceChange(
                              "travelers",
                              Math.max(1, preferences.travelers - 1),
                            )
                          }
                          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-lg font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
                        >
                          −
                        </button>

                        <div className="flex h-11 min-w-20 items-center justify-center rounded-xl bg-slate-50 px-5 text-sm font-bold text-slate-900 dark:bg-slate-800 dark:text-white">
                          {preferences.travelers}{" "}
                          {preferences.travelers === 1
                            ? "Traveler"
                            : "Travelers"}
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            handlePreferenceChange(
                              "travelers",
                              Math.min(20, preferences.travelers + 1),
                            )
                          }
                          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-lg font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-7 flex justify-end">
                    <button
                      type="button"
                      onClick={saveSettings}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-sky-50 px-5 text-sm font-semibold text-blue-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-100 hover:text-blue-800 hover:shadow-md dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20 dark:hover:text-sky-300"
                    >
                      <Save size={17} />
                      Save preferences
                    </button>
                  </div>
                </section>
              )}

              {/* Appearance */}
              {activeSection === "appearance" && (
                <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900 sm:p-7">
                  <div className="border-b border-slate-100 pb-6 dark:border-white/10">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      Appearance
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Choose how RouteMate looks on your device.
                    </p>
                  </div>

                  <div className="mt-7 grid gap-4 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (theme === "dark") {
                          toggleTheme();
                        }
                      }}
                      className={`rounded-2xl border p-5 text-left transition ${
                        theme === "light"
                          ? "border-sky-400 bg-sky-50/60 dark:border-sky-500"
                          : "border-slate-200 hover:border-slate-300 dark:border-white/10 dark:hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-amber-500 shadow-sm dark:bg-slate-800">
                          <Sun size={20} />
                        </div>

                        {theme === "light" && (
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-600 text-white">
                            <Check size={14} />
                          </span>
                        )}
                      </div>

                      <h3 className="mt-5 font-bold text-slate-900 dark:text-white">
                        Light mode
                      </h3>

                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        A bright and clean interface.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (theme === "light") {
                          toggleTheme();
                        }
                      }}
                      className={`rounded-2xl border p-5 text-left transition ${
                        theme === "dark"
                          ? "border-sky-400 bg-sky-500/5 dark:border-sky-500"
                          : "border-slate-200 hover:border-slate-300 dark:border-white/10 dark:hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-sky-400 shadow-sm dark:bg-slate-800">
                          <Moon size={20} />
                        </div>

                        {theme === "dark" && (
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-600 text-white">
                            <Check size={14} />
                          </span>
                        )}
                      </div>

                      <h3 className="mt-5 font-bold text-slate-900 dark:text-white">
                        Dark mode
                      </h3>

                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        A darker interface for low-light environments.
                      </p>
                    </button>
                  </div>
                </section>
              )}

              {/* Notifications */}
              {activeSection === "notifications" && (
                <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900 sm:p-7">
                  <div className="border-b border-slate-100 pb-6 dark:border-white/10">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      Notifications
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Choose which RouteMate notifications you want to receive.
                    </p>
                  </div>

                  <div className="mt-7 divide-y divide-slate-100 dark:divide-white/10">
                    <SettingToggle
                      title="All notifications"
                      description="Enable or disable RouteMate notifications."
                      checked={preferences.notifications}
                      onChange={(value) =>
                        handlePreferenceChange("notifications", value)
                      }
                    />

                    <SettingToggle
                      title="Trip reminders"
                      description="Receive reminders about upcoming trips."
                      checked={preferences.tripReminders}
                      disabled={!preferences.notifications}
                      onChange={(value) =>
                        handlePreferenceChange("tripReminders", value)
                      }
                    />

                    <SettingToggle
                      title="Budget alerts"
                      description="Get notified when your trip spending approaches the budget."
                      checked={preferences.budgetAlerts}
                      disabled={!preferences.notifications}
                      onChange={(value) =>
                        handlePreferenceChange("budgetAlerts", value)
                      }
                    />
                  </div>

                  <div className="mt-7 flex justify-end">
                    <button
                      type="button"
                      onClick={saveSettings}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-sky-50 px-5 text-sm font-semibold text-blue-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-100 hover:text-blue-800 hover:shadow-md dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20 dark:hover:text-sky-300"
                    >
                      <Save size={17} />
                      Save notification settings
                    </button>
                  </div>
                </section>
              )}

              {/* Privacy */}
              {activeSection === "privacy" && (
                <section className="space-y-6">
                  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900 sm:p-7">
                    <div className="border-b border-slate-100 pb-6 dark:border-white/10">
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        Privacy & data
                      </h2>

                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        RouteMate currently stores your trip data locally in
                        your browser.
                      </p>
                    </div>

                    <div className="mt-7 grid gap-4 sm:grid-cols-3">
                      <DataStat label="Saved trips" value={trips.length} />

                      <DataStat
                        label="Saved trips"
                        value={trips.filter((trip) => trip.isSaved).length}
                      />

                      <DataStat
                        label="Tracked expenses"
                        value={trips.reduce(
                          (total, trip) => total + (trip.expenses?.length || 0),
                          0,
                        )}
                      />
                    </div>
                  </div>

                  <div className="rounded-3xl border border-red-200 bg-red-50/50 p-5 dark:border-red-500/20 dark:bg-red-500/5 sm:p-7">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="font-bold text-red-700 dark:text-red-400">
                          Clear local trip data
                        </h3>

                        <p className="mt-1 max-w-xl text-sm leading-6 text-red-600/80 dark:text-red-400/70">
                          Permanently remove your locally stored trips,
                          itinerary data, expenses, hotel bookings, and
                          transport bookings from this browser.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleClearTrips}
                        className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 text-sm font-semibold text-red-600 transition hover:bg-red-100 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                      >
                        <Trash2 size={17} />
                        Clear data
                      </button>
                    </div>
                  </div>
                </section>
              )}
            </main>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function SettingToggle({
  title,
  description,
  checked,
  disabled = false,
  onChange,
}) {
  return (
    <div
      className={`flex items-center justify-between gap-5 py-5 first:pt-0 last:pb-0 ${
        disabled ? "opacity-50" : ""
      }`}
    >
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition ${
          checked ? "bg-sky-600" : "bg-slate-200 dark:bg-slate-700"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

function DataStat({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800/70">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

export default Settings;
