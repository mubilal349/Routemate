import {
  BusFront,
  CalendarDays,
  CarFront,
  Clock3,
  Plane,
  Route,
  Trash2,
  TrainFront,
  Users,
} from "lucide-react";

const typeConfig = {
  flight: {
    label: "Flight",
    icon: Plane,
  },
  train: {
    label: "Train",
    icon: TrainFront,
  },
  bus: {
    label: "Bus",
    icon: BusFront,
  },
  car: {
    label: "Car Rental",
    icon: CarFront,
  },
};

const getCurrencySymbol = (currency) => {
  switch (currency) {
    case "EUR":
      return "€";
    case "GBP":
      return "£";
    case "PKR":
      return "₨";
    default:
      return "$";
  }
};

const formatDate = (date) => {
  if (!date) return "Date not available";

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

function TransportBookingCard({ booking, onRemove }) {
  const config = typeConfig[booking?.type] || typeConfig.flight;

  const TypeIcon = config.icon;

  const currencySymbol = getCurrencySymbol(booking?.currency);

  const total = Number(booking?.total || 0);

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative h-48 shrink-0 sm:h-auto sm:w-56">
          {booking?.image ? (
            <img
              src={booking.image}
              alt={booking.name || "Transport"}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full min-h-48 items-center justify-center bg-slate-100 text-slate-400 dark:bg-slate-800">
              <TypeIcon size={30} />
            </div>
          )}

          <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-800 shadow-sm backdrop-blur dark:bg-slate-900/90 dark:text-white">
            <TypeIcon size={13} />
            {config.label}
          </div>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1 p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                {booking?.provider || "Transport Provider"}
              </p>

              <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                {booking?.name || "Unnamed Transport"}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => onRemove?.(booking.id)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400"
              aria-label="Remove transport booking"
              title="Remove booking"
            >
              <Trash2 size={17} />
            </button>
          </div>

          {/* Route */}
          <div className="mt-5 flex items-center gap-3">
            {/* From */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs text-slate-400">From</p>

              <p className="mt-1 truncate text-sm font-semibold text-slate-800 dark:text-slate-200">
                {booking?.from || "Departure"}
              </p>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {booking?.departureTime || "--:--"}
              </p>
            </div>

            {/* Route */}
            <div className="flex shrink-0 flex-col items-center text-sky-500">
              <Route size={18} />

              <span className="mt-1 whitespace-nowrap text-[10px] text-slate-400">
                {booking?.duration || "—"}
              </span>
            </div>

            {/* To */}
            <div className="min-w-0 flex-1 text-right">
              <p className="truncate text-xs text-slate-400">To</p>

              <p className="mt-1 truncate text-sm font-semibold text-slate-800 dark:text-slate-200">
                {booking?.to || "Arrival"}
              </p>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {booking?.arrivalTime || "--:--"}
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="mt-5 grid gap-3 border-t border-slate-100 pt-4 dark:border-slate-800 sm:grid-cols-3">
            {/* Date */}
            <div className="flex items-center gap-2">
              <CalendarDays size={15} className="shrink-0 text-slate-400" />

              <div className="min-w-0">
                <p className="text-[10px] text-slate-400">Travel date</p>

                <p className="truncate text-xs font-semibold text-slate-700 dark:text-slate-200">
                  {formatDate(booking?.departureDate)}
                </p>
              </div>
            </div>

            {/* Passengers */}
            <div className="flex items-center gap-2">
              <Users size={15} className="shrink-0 text-slate-400" />

              <div>
                <p className="text-[10px] text-slate-400">Passengers</p>

                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  {booking?.passengers || 1}
                </p>
              </div>
            </div>

            {/* Duration */}
            <div className="flex items-center gap-2">
              <Clock3 size={15} className="shrink-0 text-slate-400" />

              <div>
                <p className="text-[10px] text-slate-400">Duration</p>

                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  {booking?.duration || "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60">
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Total
            </span>

            <span className="text-lg font-bold text-slate-900 dark:text-white">
              {currencySymbol}
              {total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default TransportBookingCard;
