import { CalendarDays, Clock3, MapPin, Trash2, Users } from "lucide-react";

function HotelBookingCard({ booking, onRemove }) {
  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative h-52 w-full shrink-0 sm:h-auto sm:w-56">
          <img
            src={booking.image}
            alt={booking.hotelName}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />

          <div className="absolute bottom-3 left-3 rounded-lg bg-white/95 px-2.5 py-1 text-xs font-bold text-slate-900 shadow-sm">
            ★ {booking.rating || "N/A"}
          </div>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h3 className="truncate text-lg font-bold text-slate-900 dark:text-white">
                {booking.hotelName}
              </h3>

              <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                <MapPin size={15} />

                <span className="truncate">
                  {booking.location ||
                    `${booking.city || ""}${
                      booking.country ? `, ${booking.country}` : ""
                    }`}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onRemove(booking.id)}
              className="inline-flex h-9 shrink-0 items-center justify-center gap-2 self-start rounded-lg px-3 text-xs font-semibold text-red-500 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
            >
              <Trash2 size={15} />
              Remove
            </button>
          </div>

          {/* Booking details */}
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-950">
              <div className="flex items-center gap-2 text-slate-400">
                <CalendarDays size={15} />

                <span className="text-[11px] font-semibold uppercase tracking-wide">
                  Check-in
                </span>
              </div>

              <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
                {formatDate(booking.checkIn)}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-950">
              <div className="flex items-center gap-2 text-slate-400">
                <CalendarDays size={15} />

                <span className="text-[11px] font-semibold uppercase tracking-wide">
                  Check-out
                </span>
              </div>

              <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
                {formatDate(booking.checkOut)}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-950">
              <div className="flex items-center gap-2 text-slate-400">
                <Clock3 size={15} />

                <span className="text-[11px] font-semibold uppercase tracking-wide">
                  Stay
                </span>
              </div>

              <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
                {booking.nights} {booking.nights === 1 ? "night" : "nights"}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-5 flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Users size={16} />

              <span>
                {booking.guests || 1}{" "}
                {(booking.guests || 1) === 1 ? "guest" : "guests"}
              </span>

              <span className="text-slate-300 dark:text-slate-700">•</span>

              <span>${booking.pricePerNight} / night</span>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                Total
              </p>

              <p className="text-xl font-bold text-slate-900 dark:text-white">
                ${Number(booking.total || 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelBookingCard;
