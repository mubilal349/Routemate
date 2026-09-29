import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

const trendIcons = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  neutral: Minus,
};

export default function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  trendLabel = "vs last month",
}) {
  const TrendIcon = trendIcons[trend] || Minus;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-zinc-900">
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-500/5 blur-2xl transition-all duration-300 group-hover:bg-blue-500/10" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            {value}
          </h3>

          {description && (
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              {description}
            </p>
          )}
        </div>

        {Icon && (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>

      {(trendValue || trendLabel) && (
        <div className="relative mt-5 flex items-center gap-2">
          {trendValue && (
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                trend === "down"
                  ? "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                  : trend === "up"
                    ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                    : "bg-zinc-100 text-zinc-600 dark:bg-white/10 dark:text-zinc-300"
              }`}
            >
              <TrendIcon className="h-3.5 w-3.5" />
              {trendValue}
            </span>
          )}

          {trendLabel && (
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {trendLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
