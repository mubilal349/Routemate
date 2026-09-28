import { Clock3, DollarSign, MapPin, MoreVertical } from "lucide-react";

function ActivityCard({ activity, onEdit, onDelete }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-2 inline-flex items-center rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-semibold text-sky-700 dark:bg-sky-500/10 dark:text-sky-400">
            {activity.category}
          </div>

          <h3 className="truncate text-sm font-bold text-slate-900 dark:text-white">
            {activity.title}
          </h3>
        </div>

        <div className="relative">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
            aria-label="Activity options"
          >
            <MoreVertical size={17} />
          </button>

          <div className="absolute right-0 top-9 z-20 hidden w-32 overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-lg group-focus-within:block dark:border-slate-700 dark:bg-slate-900">
            <button
              type="button"
              onClick={onEdit}
              className="block w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={onDelete}
              className="block w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2.5">
        {(activity.startTime || activity.endTime) && (
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Clock3
              size={14}
              className="shrink-0 text-sky-600 dark:text-sky-400"
            />

            <span>
              {activity.startTime || "--:--"}
              {activity.endTime && ` – ${activity.endTime}`}
            </span>
          </div>
        )}

        {activity.location && (
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <MapPin
              size={14}
              className="shrink-0 text-sky-600 dark:text-sky-400"
            />

            <span className="truncate">{activity.location}</span>
          </div>
        )}

        {Number(activity.estimatedCost) > 0 && (
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <DollarSign
              size={14}
              className="shrink-0 text-sky-600 dark:text-sky-400"
            />

            <span>
              Estimated cost: ${Number(activity.estimatedCost).toLocaleString()}
            </span>
          </div>
        )}
      </div>

      {activity.notes && (
        <p className="mt-4 border-t border-slate-100 pt-3 text-xs leading-5 text-slate-500 dark:border-slate-800 dark:text-slate-400">
          {activity.notes}
        </p>
      )}
    </div>
  );
}

export default ActivityCard;
