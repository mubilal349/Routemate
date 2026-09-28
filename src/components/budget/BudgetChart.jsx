import { BarChart3, Building2, CreditCard, Plane } from "lucide-react";

function formatCurrency(amount, currency = "USD") {
  const numericAmount = Number(amount || 0);

  const symbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    PKR: "₨",
  };

  const symbol = symbols[currency] || currency;

  return `${symbol}${numericAmount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function BudgetChart({
  manualExpenses = 0,
  hotelTotal = 0,
  transportTotal = 0,
  currency = "USD",
}) {
  const categories = [
    {
      label: "Manual Expenses",
      amount: Number(manualExpenses || 0),
      icon: CreditCard,
    },
    {
      label: "Hotels",
      amount: Number(hotelTotal || 0),
      icon: Building2,
    },
    {
      label: "Transport",
      amount: Number(transportTotal || 0),
      icon: Plane,
    },
  ];

  const total = categories.reduce((sum, category) => sum + category.amount, 0);

  const maxAmount = Math.max(
    ...categories.map((category) => category.amount),
    1,
  );

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-blue-600 dark:bg-sky-500/10 dark:text-sky-400">
            <BarChart3 size={21} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Spending Breakdown
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              See where your trip budget is going.
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 px-4 py-2 dark:bg-slate-800/70">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Total spent
          </span>

          <p className="text-sm font-bold text-slate-900 dark:text-white">
            {formatCurrency(total, currency)}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-8 space-y-6">
        {categories.map((category) => {
          const Icon = category.icon;

          const percentage =
            total > 0 ? Math.round((category.amount / total) * 100) : 0;

          const width =
            category.amount > 0
              ? Math.max((category.amount / maxAmount) * 100, 4)
              : 0;

          return (
            <div key={category.label}>
              {/* Label row */}
              <div className="mb-2.5 flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    <Icon size={15} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {category.label}
                    </p>

                    <p className="text-xs text-slate-400">
                      {percentage}% of spending
                    </p>
                  </div>
                </div>

                <p className="shrink-0 text-sm font-bold text-slate-900 dark:text-white">
                  {formatCurrency(category.amount, currency)}
                </p>
              </div>

              {/* Bar */}
              <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-700 dark:bg-sky-500"
                  style={{
                    width: `${width}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {total === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 py-6 text-center dark:border-slate-700 dark:bg-slate-800/50">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
            No spending recorded yet.
          </p>

          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
            Add expenses, hotels, or transport bookings to see your spending
            breakdown.
          </p>
        </div>
      )}
    </section>
  );
}

export default BudgetChart;
