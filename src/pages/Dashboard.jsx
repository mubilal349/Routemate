import { CalendarDays, MapPin, Plane, WalletCards } from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import { useTrips } from "../context/TripContext";

import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import BudgetOverview from "../components/dashboard/BudgetOverview";
import RecentActivity from "../components/dashboard/RecentActivity";
import StatsCard from "../components/dashboard/StatsCard";
import UpcomingTrips from "../components/dashboard/UpcomingTrips";

function Dashboard() {
  const { user } = useAuth();
  const { trips } = useTrips();

  /* =========================================================
     DASHBOARD STATISTICS
  ========================================================= */

  // Total number of trips
  const totalTrips = trips.length;

  // Unique destinations
  const totalDestinations = new Set(
    trips.map((trip) => trip.destination?.trim()).filter(Boolean),
  ).size;

  // Total activities across all trips
  const totalActivities = trips.reduce(
    (total, trip) => total + (trip.activities?.length || 0),
    0,
  );

  // Total expenses across all trips
  const totalExpenses = trips.reduce(
    (total, trip) =>
      total +
      (trip.expenses || []).reduce(
        (sum, expense) => sum + Number(expense.amount || 0),
        0,
      ),
    0,
  );

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* Welcome Banner */}
        <WelcomeBanner user={user} />

        {/* Stats */}
        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            icon={Plane}
            value={totalTrips}
            label="Trips planned"
            status="Total"
            iconClassName="bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
          />

          <StatsCard
            icon={MapPin}
            value={totalDestinations}
            label="Destinations"
            status="Saved"
            iconClassName="bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
          />

          <StatsCard
            icon={CalendarDays}
            value={totalActivities}
            label="Activities"
            status="Planned"
            iconClassName="bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400"
          />

          <StatsCard
            icon={WalletCards}
            value={`$${totalExpenses.toLocaleString()}`}
            label="Travel expenses"
            status="Total"
            iconClassName="bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
          />
        </section>

        {/* Budget + Recent Activity */}
        <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
          <BudgetOverview />
          <RecentActivity />
        </section>

        {/* Upcoming Trips */}
        <section className="mt-6">
          <UpcomingTrips />
        </section>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
