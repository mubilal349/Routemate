import {
  Activity as ActivityIcon,
  ArrowLeft,
  CalendarDays,
  CircleDollarSign,
  Hotel,
  MapPin,
  Plane,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { useTrips } from "../../context/TripContext";

function Activity() {
  const { trips } = useTrips();

  const activities = [];

  trips.forEach((trip) => {
    // Trip created
    if (trip.createdAt) {
      activities.push({
        id: `${trip.id}-created`,
        icon: Plus,
        title: "Trip created",
        description: trip.title || "New trip",
        date: trip.createdAt,
        color:
          "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
      });
    }

    // Activities
    (trip.activities || []).forEach((activity) => {
      activities.push({
        id: `${trip.id}-activity-${activity.id}`,
        icon: CalendarDays,
        title: "Activity added",
        description:
          activity.title ||
          activity.name ||
          activity.description ||
          trip.destination ||
          "New activity",
        date: activity.createdAt || trip.updatedAt,
        color:
          "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
      });
    });

    // Expenses
    (trip.expenses || []).forEach((expense) => {
      activities.push({
        id: `${trip.id}-expense-${expense.id}`,
        icon: CircleDollarSign,
        title: "Expense added",
        description: `${expense.title || expense.name || "Travel expense"} · $${Number(
          expense.amount || 0,
        ).toLocaleString()}`,
        date: expense.createdAt || trip.updatedAt,
        color:
          "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
      });
    });

    // Hotels
    (trip.hotels || []).forEach((hotel) => {
      activities.push({
        id: `${trip.id}-hotel-${hotel.id}`,
        icon: Hotel,
        title: "Hotel added",
        description: hotel.hotelName || "Hotel booking",
        date: hotel.bookedAt || trip.updatedAt,
        color:
          "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
      });
    });

    // Transport
    (trip.transport || []).forEach((transport) => {
      activities.push({
        id: `${trip.id}-transport-${transport.id}`,
        icon: Plane,
        title: "Transport added",
        description:
          transport.name || transport.provider || "Transport booking",
        date: transport.bookedAt || trip.updatedAt,
        color: "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400",
      });
    });
  });

  const sortedActivities = activities
    .filter((item) => item.date)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const formatDate = (date) => {
    const value = new Date(date);

    if (Number.isNaN(value.getTime())) {
      return "Recently";
    }

    return value.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* Back */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="mt-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <ActivityIcon size={23} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                Recent Activity
              </h1>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                View everything you've recently added to your trips.
              </p>
            </div>
          </div>
        </div>

        {/* Activity List */}
        <section className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {sortedActivities.length > 0 ? (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {sortedActivities.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.id}
                    className="flex items-start gap-4 p-5 transition hover:bg-slate-50 dark:hover:bg-slate-950 sm:p-6"
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.color}`}
                    >
                      <Icon size={19} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                        {item.title}
                      </h2>

                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {item.description}
                      </p>

                      <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                        {formatDate(item.date)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
                <ActivityIcon size={28} />
              </div>

              <h2 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                No activity yet
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                Create a trip or add activities, expenses, hotels, or
                transportation to start building your activity history.
              </p>

              <Link
                to="/trips/create"
                className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <Plus size={17} />
                Create a Trip
              </Link>
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}

export default Activity;
