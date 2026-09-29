import {
  Activity,
  ArrowRight,
  CalendarDays,
  CircleDollarSign,
  Hotel,
  MapPin,
  Plane,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useTrips } from "../../context/TripContext";

function RecentActivity() {
  const { trips } = useTrips();

  const activities = [];

  trips.forEach((trip) => {
    if (trip.createdAt) {
      activities.push({
        id: `${trip.id}-created`,
        type: "trip",
        icon: Plus,
        title: "Trip created",
        description: trip.title || "New trip",
        date: trip.createdAt,
        color:
          "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
      });
    }

    (trip.activities || []).forEach((activity) => {
      activities.push({
        id: `${trip.id}-activity-${activity.id}`,
        type: "activity",
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

    (trip.expenses || []).forEach((expense) => {
      activities.push({
        id: `${trip.id}-expense-${expense.id}`,
        type: "expense",
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

    (trip.hotels || []).forEach((hotel) => {
      activities.push({
        id: `${trip.id}-hotel-${hotel.id}`,
        type: "hotel",
        icon: Hotel,
        title: "Hotel added",
        description: hotel.hotelName || "Hotel booking",
        date: hotel.bookedAt || trip.updatedAt,
        color:
          "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
      });
    });

    (trip.transport || []).forEach((transport) => {
      activities.push({
        id: `${trip.id}-transport-${transport.id}`,
        type: "transport",
        icon: Plane,
        title: "Transport added",
        description:
          transport.name || transport.provider || "Transport booking",
        date: transport.bookedAt || trip.updatedAt,
        color: "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400",
      });
    });
  });

  const recentActivities = activities
    .filter((activity) => activity.date)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const formatDate = (date) => {
    const value = new Date(date);

    if (Number.isNaN(value.getTime())) {
      return "Recently";
    }

    return value.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            <Activity size={20} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Recent Activity
            </h2>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Your latest travel updates
            </p>
          </div>
        </div>

        <Link
          to="/activity"
          className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          View
          <ArrowRight size={15} />
        </Link>
      </div>

      {/* Activity List */}
      <div className="mt-6">
        {recentActivities.length > 0 ? (
          <div className="space-y-1">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;

              return (
                <div
                  key={activity.id}
                  className="flex items-center gap-4 rounded-2xl p-3 transition hover:bg-slate-50 dark:hover:bg-slate-950"
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${activity.color}`}
                  >
                    <Icon size={18} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                      {activity.title}
                    </p>

                    <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                      {activity.description}
                    </p>
                  </div>

                  <span className="shrink-0 text-xs text-slate-400 dark:text-slate-500">
                    {formatDate(activity.date)}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 px-5 py-10 text-center dark:border-slate-800">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400 dark:bg-slate-800">
              <Activity size={21} />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">
              No recent activity
            </h3>

            <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-500 dark:text-slate-400">
              Create a trip or add an activity, hotel, transport, or expense to
              see updates here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default RecentActivity;
