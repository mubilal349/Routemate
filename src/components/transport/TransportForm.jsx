import {
  ArrowRight,
  BusFront,
  CalendarDays,
  CarFront,
  CheckCircle2,
  Clock3,
  Plane,
  TrainFront,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

import { useTrips } from "../../context/TripContext";

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

function TransportForm({ transport, initialTripId = "", onClose, onSuccess }) {
  const { trips, addTransportToTrip } = useTrips();

  const [selectedTripId, setSelectedTripId] = useState(
    initialTripId || trips[0]?.id || "",
  );

  const [travelDate, setTravelDate] = useState(transport?.departureDate || "");

  const [passengers, setPassengers] = useState(1);

  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const config = typeConfig[transport?.type] || typeConfig.flight;

  const TypeIcon = config.icon;

  const price = Number(transport?.price || 0);

  const seatsAvailable = Number(transport?.seatsAvailable || 0);

  const currencySymbol = getCurrencySymbol(transport?.currency);

  const total = useMemo(() => {
    return price * passengers;
  }, [price, passengers]);

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    if (!selectedTripId) {
      setError("Please select a trip.");
      return;
    }

    if (!travelDate) {
      setError("Please select a travel date.");
      return;
    }

    if (passengers < 1) {
      setError("At least one passenger is required.");
      return;
    }

    if (seatsAvailable > 0 && passengers > seatsAvailable) {
      setError(
        `Only ${seatsAvailable} seat${
          seatsAvailable === 1 ? "" : "s"
        } are currently available.`,
      );
      return;
    }

    const booking = addTransportToTrip(selectedTripId, {
      transportId: transport.id,
      type: transport.type,
      provider: transport.provider,
      name: transport.name,
      from: transport.from,
      to: transport.to,
      departureDate: travelDate,
      departureTime: transport.departureTime,
      arrivalTime: transport.arrivalTime,
      duration: transport.duration,
      price,
      currency: transport.currency,
      passengers,
      total,
      image: transport.image,
    });

    if (!booking) {
      setError("Unable to save the transport booking.");
      return;
    }

    setSaved(true);

    setTimeout(() => {
      onSuccess?.(booking);
      onClose?.();
    }, 900);
  };

  if (!transport) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose?.();
        }
      }}
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-6 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
              <TypeIcon size={22} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                {config.label}
              </p>

              <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                Book Transport
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
            aria-label="Close"
          >
            <X size={19} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Transport Summary */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="relative h-40">
              <img
                src={transport.image}
                alt={transport.name}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-bold text-white">{transport.name}</h3>

                <p className="mt-1 text-xs text-white/80">
                  {transport.provider}
                </p>
              </div>
            </div>

            <div className="grid gap-4 p-4 sm:grid-cols-3">
              <div className="min-w-0">
                <p className="text-xs text-slate-400">From</p>

                <p className="mt-1 truncate text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {transport.from}
                </p>
              </div>

              <div className="min-w-0">
                <p className="text-xs text-slate-400">To</p>

                <p className="mt-1 truncate text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {transport.to}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">Duration</p>

                <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-800 dark:text-slate-200">
                  <Clock3 size={14} />
                  {transport.duration}
                </p>
              </div>
            </div>
          </div>

          {/* Success */}
          {saved ? (
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center dark:border-emerald-900/50 dark:bg-emerald-500/10">
              <CheckCircle2
                size={30}
                className="mx-auto text-emerald-600 dark:text-emerald-400"
              />

              <h3 className="mt-3 font-bold text-emerald-800 dark:text-emerald-300">
                Transport added successfully
              </h3>

              <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-400">
                Your booking has been saved to the selected trip.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {/* Trip */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Select Trip
                </label>

                <select
                  value={selectedTripId}
                  onChange={(event) => setSelectedTripId(event.target.value)}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value="">Choose a trip</option>

                  {trips.map((trip) => (
                    <option key={trip.id} value={trip.id}>
                      {trip.title} — {trip.destination}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Travel Date
                </label>

                <div className="relative">
                  <CalendarDays
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="date"
                    value={travelDate}
                    onChange={(event) => setTravelDate(event.target.value)}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              {/* Passengers */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200">
                    Passengers
                  </label>

                  {seatsAvailable > 0 && (
                    <span className="text-xs text-slate-400">
                      {seatsAvailable} seats available
                    </span>
                  )}
                </div>

                <div className="flex h-11 items-center justify-between rounded-xl border border-slate-200 px-4 dark:border-slate-700">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <Users size={17} />
                    Passengers
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setPassengers((value) => Math.max(1, value - 1))
                      }
                      disabled={passengers <= 1}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                    >
                      −
                    </button>

                    <span className="w-5 text-center text-sm font-bold text-slate-900 dark:text-white">
                      {passengers}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setPassengers((value) =>
                          seatsAvailable > 0
                            ? Math.min(seatsAvailable, value + 1)
                            : value + 1,
                        )
                      }
                      disabled={
                        seatsAvailable > 0 && passengers >= seatsAvailable
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800/60">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-slate-500 dark:text-slate-400">
                    {currencySymbol}
                    {price.toLocaleString()} × {passengers} passenger
                    {passengers === 1 ? "" : "s"}
                  </span>

                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {currencySymbol}
                    {total.toLocaleString()}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3 dark:border-slate-700">
                  <span className="font-bold text-slate-900 dark:text-white">
                    Total
                  </span>

                  <span className="text-xl font-bold text-slate-900 dark:text-white">
                    {currencySymbol}
                    {total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-900/50 dark:bg-red-500/10 dark:text-red-400">
                  {error}
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-sky-50 px-5 text-sm font-semibold text-blue-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-100 hover:text-blue-800 hover:shadow-md dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20 dark:hover:text-sky-300"
                >
                  Book Transport
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default TransportForm;
