import { CalendarDays, Plus } from "lucide-react";

import ActivityCard from "./ActivityCard";
import DraggableActivity from "./DraggableActivity";
import DroppableDay from "./DroppableDay";

function formatDayDate(date) {
  if (!date) return "Date not set";

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function DayColumn({ day, onAddActivity, onEditActivity, onDeleteActivity }) {
  return (
    <section className="min-w-[300px] flex-1 rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/60">
      {/* Day Header */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
              <CalendarDays size={17} />
            </div>

            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                {day.title}
              </h2>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                {formatDayDate(day.date)}
              </p>
            </div>
          </div>
        </div>

        <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-500 shadow-sm dark:bg-slate-900 dark:text-slate-400">
          {day.activities.length}{" "}
          {day.activities.length === 1 ? "activity" : "activities"}
        </span>
      </div>

      {/* Activities */}
      <DroppableDay dayId={day.id}>
        <div className="space-y-3">
          {day.activities.length > 0 ? (
            day.activities.map((activity) => (
              <DraggableActivity
                key={activity.id}
                activity={activity}
                dayId={day.id}
                onEdit={() => onEditActivity(day.id, activity)}
                onDelete={() => onDeleteActivity(day.id, activity.id)}
              />
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center dark:border-slate-700 dark:bg-slate-900">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                No activities yet
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-400">
                Add your first activity for this day.
              </p>
            </div>
          )}
        </div>
      </DroppableDay>

      {/* Add Activity */}
      <button
        type="button"
        onClick={() => onAddActivity(day.id)}
        className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-sky-50 text-sm font-semibold text-blue-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-100 hover:text-blue-800 hover:shadow-md dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20 dark:hover:text-sky-300"
      >
        <Plus size={16} />
        Add Activity
      </button>
    </section>
  );
}

export default DayColumn;
