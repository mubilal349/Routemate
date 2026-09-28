import {
  CalendarDays,
  CircleDollarSign,
  FileText,
  Tag,
  Trash2,
} from "lucide-react";

const categoryConfig = {
  Food: {
    label: "Food",
  },
  Transport: {
    label: "Transport",
  },
  Accommodation: {
    label: "Accommodation",
  },
  Activities: {
    label: "Activities",
  },
  Shopping: {
    label: "Shopping",
  },
  Tickets: {
    label: "Tickets",
  },
  Other: {
    label: "Other",
  },
};

const currencySymbols = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  PKR: "₨",
};

function formatAmount(amount, currency = "USD") {
  const numericAmount = Number(amount || 0);
  const symbol = currencySymbols[currency] || currency;

  return `${symbol}${numericAmount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(date) {
  if (!date) return "No date";

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function ExpenseCard({ expense, onRemove }) {
  if (!expense) return null;

  const category = categoryConfig[expense.category] || categoryConfig.Other;

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-blue-600 dark:bg-sky-500/10 dark:text-sky-400">
          <CircleDollarSign size={21} />
        </div>

        {/* Main content */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-bold text-slate-900 dark:text-white">
                {expense.title || "Untitled Expense"}
              </h3>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  <Tag size={12} />
                  {category.label}
                </span>

                <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <CalendarDays size={13} />
                  {formatDate(expense.date)}
                </span>
              </div>
            </div>

            {/* Amount */}
            <div className="shrink-0">
              <p className="text-base font-bold text-slate-900 dark:text-white">
                {formatAmount(expense.amount, expense.currency)}
              </p>
            </div>
          </div>

          {/* Notes */}
          {expense.notes && (
            <div className="mt-3 flex items-start gap-2 rounded-xl bg-slate-50 px-3 py-2.5 dark:bg-slate-800/60">
              <FileText size={14} className="mt-0.5 shrink-0 text-slate-400" />

              <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
                {expense.notes}
              </p>
            </div>
          )}

          {/* Remove */}
          {onRemove && (
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={() => onRemove(expense.id)}
                className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-400 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400"
              >
                <Trash2 size={14} />
                Remove
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default ExpenseCard;
