import { useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Hotel,
  Minus,
  Plus,
  Users,
  X,
} from "lucide-react";

import { useTrips } from "../../context/TripContext";

function HotelBookingForm({ hotel, onClose, onSuccess }) {
  const { trips, addHotelToTrip } = useTrips();

  const [tripId, setTripId] = useState(trips[0]?.id || "");

  const [checkIn, setCheckIn] = useState("");

  const [checkOut, setCheckOut] = useState("");

  const [guests, setGuests] = useState(1);

  const [error, setError] = useState("");

  const [saving, setSaving] = useState(false);

  const [saved, setSaved] = useState(false);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) {
      return 0;
    }

    const start = new Date(`${checkIn}T00:00:00`);

    const end = new Date(`${checkOut}T00:00:00`);

    const difference = end.getTime() - start.getTime();

    const calculatedNights = Math.ceil(difference / (1000 * 60 * 60 * 24));

    return calculatedNights > 0 ? calculatedNights : 0;
  }, [checkIn, checkOut]);

  const total = nights * hotel.pricePerNight;

  const handleCheckInChange = (event) => {
    const value = event.target.value;

    setCheckIn(value);
    setError("");

    if (checkOut && value >= checkOut) {
      setCheckOut("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    if (!tripId) {
      setError("Please select a trip.");
      return;
    }

    if (!checkIn) {
      setError("Please select a check-in date.");
      return;
    }

    if (!checkOut) {
      setError("Please select a check-out date.");
      return;
    }

    if (checkOut <= checkIn) {
      setError("Check-out must be after check-in.");
      return;
    }

    if (nights <= 0) {
      setError("Please select valid dates.");
      return;
    }

    setSaving(true);

    const booking = addHotelToTrip(tripId, {
      hotelId: hotel.id,
      hotelName: hotel.name,
      location: hotel.location,
      city: hotel.city,
      country: hotel.country,
      image: hotel.image,
      rating: hotel.rating,
      pricePerNight: hotel.pricePerNight,
      currency: hotel.currency,
      checkIn,
      checkOut,
      nights,
      guests,
      total,
    });

    setSaving(false);
    setSaved(true);

    if (onSuccess) {
      onSuccess(booking);
    }
  };

  const increaseGuests = () => {
    setGuests((current) => Math.min(current + 1, 20));
  };

  const decreaseGuests = () => {
    setGuests((current) => Math.max(current - 1, 1));
  };

  if (!hotel) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative my-8 w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6 dark:border-slate-800">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-blue-600 dark:bg-sky-500/10 dark:text-sky-400">
              <Hotel size={19} />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-base font-bold text-slate-900 dark:text-white">
                Add hotel to your trip
              </h2>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Complete your stay details
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
            aria-label="Close booking form"
          >
            <X size={20} />
          </button>
        </div>

        {saved ? (
          /* ===================================================
             SUCCESS
          ==================================================== */
          <div className="px-6 py-14 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              <CheckCircle2 size={32} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
              Hotel added successfully
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
              {hotel.name} has been added to your selected trip.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-7 inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6">
            {/* Hotel summary */}
            <div className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="h-20 w-24 shrink-0 rounded-xl object-cover"
              />

              <div className="min-w-0">
                <h3 className="truncate text-sm font-bold text-slate-900 dark:text-white">
                  {hotel.name}
                </h3>

                <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
                  {hotel.location}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-500">
                    ★ {hotel.rating}
                  </span>

                  <span className="text-xs text-slate-400">·</span>

                  <span className="text-xs font-semibold text-blue-600 dark:text-sky-400">
                    ${hotel.pricePerNight}
                    /night
                  </span>
                </div>
              </div>
            </div>

            {/* Trip */}
            <div className="mt-6">
              <label
                htmlFor="trip"
                className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200"
              >
                Select trip
              </label>

              {trips.length === 0 ? (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300">
                  You don't have any trips yet. Create a trip first before
                  adding a hotel.
                </div>
              ) : (
                <div className="relative">
                  <select
                    id="trip"
                    value={tripId}
                    onChange={(event) => setTripId(event.target.value)}
                    className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-slate-800 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  >
                    {trips.map((trip) => (
                      <option key={trip.id} value={trip.id}>
                        {trip.title}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={18}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              )}
            </div>

            {/* Dates */}
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="check-in"
                  className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200"
                >
                  Check-in
                </label>

                <div className="relative">
                  <CalendarDays
                    size={17}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="check-in"
                    type="date"
                    value={checkIn}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={handleCheckInChange}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-3 text-sm text-slate-800 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="check-out"
                  className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200"
                >
                  Check-out
                </label>

                <div className="relative">
                  <CalendarDays
                    size={17}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="check-out"
                    type="date"
                    value={checkOut}
                    min={checkIn || new Date().toISOString().split("T")[0]}
                    onChange={(event) => {
                      setCheckOut(event.target.value);
                      setError("");
                    }}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-3 text-sm text-slate-800 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Guests */}
            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
                Guests
              </label>

              <div className="flex h-12 items-center justify-between rounded-xl border border-slate-200 bg-white px-3 dark:border-slate-700 dark:bg-slate-950">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <Users size={17} />

                  <span>
                    {guests} {guests === 1 ? "guest" : "guests"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={decreaseGuests}
                    disabled={guests <= 1}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <Minus size={15} />
                  </button>

                  <span className="w-6 text-center text-sm font-bold text-slate-900 dark:text-white">
                    {guests}
                  </span>

                  <button
                    type="button"
                    onClick={increaseGuests}
                    disabled={guests >= 20}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Calculation */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">
                  Price per night
                </span>

                <span className="font-semibold text-slate-900 dark:text-white">
                  ${hotel.pricePerNight}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <Clock3 size={15} />
                  Nights
                </span>

                <span className="font-semibold text-slate-900 dark:text-white">
                  {nights}
                </span>
              </div>

              <div className="my-4 border-t border-slate-200 dark:border-slate-800" />

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Estimated total
                  </p>

                  <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                    ${total.toLocaleString()}
                  </p>
                </div>

                {nights > 0 && (
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    {nights} {nights === 1 ? "night" : "nights"}
                  </span>
                )}
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving || trips.length === 0}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Hotel"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default HotelBookingForm;
