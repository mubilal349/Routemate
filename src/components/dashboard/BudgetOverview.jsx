import {
  ArrowRight,
  CircleDollarSign,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useTrips } from "../../context/TripContext";

function BudgetOverview() {
  const { trips, totalBudget } = useTrips();

  const totalExpenses = trips.reduce(
    (total, trip) =>
      total +
      (trip.expenses || []).reduce(
        (sum, expense) => sum + Number(expense.amount || 0),
        0,
      ),
    0,
  );

  const remainingBudget = Math.max(totalBudget - totalExpenses, 0);

  const spentPercentage =
    totalBudget > 0 ? Math.min((totalExpenses / totalBudget) * 100, 100) : 0;

  const budgetStatus =
    totalBudget === 0
      ? "No budget set"
      : totalExpenses > totalBudget
        ? "Over budget"
        : `${Math.round(spentPercentage)}% used`;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
              <CircleDollarSign size={20} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Budget Overview
              </h2>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Your travel budget at a glance
              </p>
            </div>
          </div>
        </div>

        <Link
          to="/budget"
          className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          View
          <ArrowRight size={15} />
        </Link>
      </div>

      {/* Main Amount */}
      <div className="mt-7">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Total budget
            </p>

            <p className="mt-1 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
              ${totalBudget.toLocaleString()}
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              totalBudget === 0
                ? "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                : totalExpenses > totalBudget
                  ? "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                  : "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
            }`}
          >
            {budgetStatus}
          </span>
        </div>

        {/* Progress */}
        <div className="mt-5">
          <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                totalExpenses > totalBudget
                  ? "bg-red-500"
                  : "bg-gradient-to-r from-blue-500 to-indigo-600"
              }`}
              style={{ width: `${spentPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <TrendingDown size={16} />
            <span className="text-xs font-medium">Spent</span>
          </div>

          <p className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
            ${totalExpenses.toLocaleString()}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <TrendingUp size={16} />
            <span className="text-xs font-medium">Remaining</span>
          </div>

          <p className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
            ${remainingBudget.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Empty State */}
      {trips.length === 0 && (
        <div className="mt-5 rounded-2xl border border-dashed border-slate-200 px-4 py-4 text-center dark:border-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Create a trip and add a budget to start tracking your travel
            spending.
          </p>
        </div>
      )}
    </section>
  );
}

export default BudgetOverview;
