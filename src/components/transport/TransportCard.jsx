import {
  BusFront,
  CarFront,
  CalendarDays,
  Clock3,
  Plane,
  Route,
  Star,
  TrainFront,
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

function TransportCard({ transport, selected = false, onSelect }) {
  const config = typeConfig[transport.type] || typeConfig.flight;

  const TypeIcon = config.icon;

  const currencySymbol =
    transport.currency === "EUR"
      ? "€"
      : transport.currency === "GBP"
        ? "£"
        : transport.currency === "PKR"
          ? "₨"
          : "$";

  return (
    <article
      className={`group overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-900 ${
        selected
          ? "border-sky-400 ring-2 ring-sky-400/20 dark:border-sky-500"
          : "border-slate-200 dark:border-slate-800"
      }`}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={
            transport.image ||
            "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80"
          }
          alt={transport.name || "Transport"}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {/* Type */}
        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-800 shadow-sm backdrop-blur dark:bg-slate-900/90 dark:text-white">
          <TypeIcon size={14} />
          {config.label}
        </div>

        {/* Selected */}
        {selected && (
          <div className="absolute right-4 top-4 rounded-full bg-sky-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
            Selected
          </div>
        )}

        {/* Price */}
        <div className="absolute bottom-4 right-4 rounded-2xl bg-white/95 px-4 py-2 shadow-lg backdrop-blur dark:bg-slate-900/95">
          <p className="text-xs text-slate-500 dark:text-slate-400">From</p>

          <p className="text-lg font-bold text-slate-900 dark:text-white">
            {currencySymbol}
            {Number(transport.price || 0).toLocaleString()}
          </p>
        </div>

        {/* Provider */}
        <div className="absolute bottom-4 left-4 max-w-[55%] truncate text-sm font-semibold text-white">
          {transport.provider || "Transport Provider"}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          {transport.name || "Unnamed Transport"}
        </h3>

        {/* Route */}
        <div className="mt-4 flex items-center gap-3">
          {/* Departure */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-200">
              {transport.from || "Departure"}
            </p>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {transport.departureTime || "--:--"}
            </p>
          </div>

          {/* Route indicator */}
          <div className="flex shrink-0 flex-col items-center">
            <Route size={18} className="text-sky-500" />

            <span className="mt-1 whitespace-nowrap text-[10px] font-medium text-slate-400">
              {transport.duration || "—"}
            </span>
          </div>

          {/* Arrival */}
          <div className="min-w-0 flex-1 text-right">
            <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-200">
              {transport.to || "Arrival"}
            </p>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {transport.arrivalTime || "--:--"}
            </p>
          </div>
        </div>

        {/* Meta */}
        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
          <div className="flex min-w-0 items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <CalendarDays size={14} className="shrink-0" />

            <span className="truncate">
              {formatDate(transport.departureDate)}
            </span>
          </div>

          <div className="flex items-center justify-end gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <Star size={14} className="shrink-0" />
            {transport.seatsAvailable ?? 0} seats left
          </div>
        </div>

        {/* Select */}
        <button
          type="button"
          onClick={() => onSelect(transport)}
          className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-xl bg-sky-50 px-4 text-sm font-semibold text-blue-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-100 hover:text-blue-800 hover:shadow-md dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20 dark:hover:text-sky-300"
        >
          {selected ? "Selected Transport" : "Select Transport"}
        </button>
      </div>
    </article>
  );
}

export default TransportCard;
