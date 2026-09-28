import {
  ArrowDown,
  ArrowUp,
  Building2,
  CircleDollarSign,
  CreditCard,
  Plane,
  Wallet,
} from "lucide-react";

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

function BudgetOverview({
  budget = 0,
  manualExpenses = 0,
  hotelTotal = 0,
  transportTotal = 0,
  currency = "USD",
}) {
  const totalSpent =
    Number(manualExpenses || 0) +
    Number(hotelTotal || 0) +
    Number(transportTotal || 0);

  const remaining = Number(budget || 0) - totalSpent;

  const progress =
    Number(budget) > 0 ? Math.min((totalSpent / Number(budget)) * 100, 100) : 0;

  const isOverBudget = totalSpent > Number(budget || 0);

  return (
    <div className="space-y-5">
      {/* Main budget card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-blue-600 dark:bg-sky-500/10 dark:text-sky-400">
                <Wallet size={20} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Trip Budget
                </p>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {formatCurrency(budget, currency)}
                </h2>
              </div>
            </div>
          </div>

          <div className="lg:text-right">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total Spent
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
              {formatCurrency(totalSpent, currency)}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-7">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-medium text-slate-500 dark:text-slate-400">
              Budget usage
            </span>

            <span
              className={
                isOverBudget
                  ? "font-bold text-red-500"
                  : "font-bold text-blue-600 dark:text-sky-400"
              }
            >
              {Math.round(progress)}%
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isOverBudget ? "bg-red-500" : "bg-blue-600 dark:bg-sky-500"
              }`}
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">
              {isOverBudget ? "You are over budget" : "Remaining budget"}
            </span>

            <span
              className={`font-bold ${
                isOverBudget
                  ? "text-red-500"
                  : "text-emerald-600 dark:text-emerald-400"
              }`}
            >
              {formatCurrency(Math.abs(remaining), currency)}
            </span>
          </div>
        </div>
      </div>

      {/* Spending breakdown */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Manual expenses */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-blue-600 dark:bg-sky-500/10 dark:text-sky-400">
              <CreditCard size={19} />
            </div>

            <ArrowUp size={16} className="text-slate-300 dark:text-slate-600" />
          </div>

          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Manual Expenses
          </p>

          <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
            {formatCurrency(manualExpenses, currency)}
          </p>
        </div>

        {/* Hotels */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-blue-600 dark:bg-sky-500/10 dark:text-sky-400">
              <Building2 size={19} />
            </div>

            <ArrowUp size={16} className="text-slate-300 dark:text-slate-600" />
          </div>

          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Hotels
          </p>

          <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
            {formatCurrency(hotelTotal, currency)}
          </p>
        </div>

        {/* Transport */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-blue-600 dark:bg-sky-500/10 dark:text-sky-400">
              <Plane size={19} />
            </div>

            <ArrowUp size={16} className="text-slate-300 dark:text-slate-600" />
          </div>

          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Transport
          </p>

          <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
            {formatCurrency(transportTotal, currency)}
          </p>
        </div>

        {/* Remaining */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                isOverBudget
                  ? "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                  : "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
              }`}
            >
              {isOverBudget ? (
                <ArrowDown size={19} />
              ) : (
                <CircleDollarSign size={19} />
              )}
            </div>
          </div>

          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
            {isOverBudget ? "Over Budget" : "Remaining"}
          </p>

          <p
            className={`mt-1 text-xl font-bold ${
              isOverBudget
                ? "text-red-600 dark:text-red-400"
                : "text-slate-900 dark:text-white"
            }`}
          >
            {formatCurrency(Math.abs(remaining), currency)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BudgetOverview;
