import {
  ArrowLeft,
  ArrowRight,
  BusFront,
  CalendarDays,
  DollarSign,
  Edit3,
  MapPin,
  Trash2,
  Users,
  Plus,
  ReceiptText,
  Hotel,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Button from "../../components/common/Button";
import DashboardLayout from "../../components/layout/DashboardLayout";
import HotelBookingCard from "../../components/hotels/HotelBookingCard";
import TransportBookingCard from "../../components/transport/TransportBookingCard";
import TripHeader from "../../components/trips/TripHeader";
import { useTrips } from "../../context/TripContext";

function formatDate(dateString) {
  if (!dateString) {
    return "Not set";
  }

  const date = new Date(`${dateString}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return "Not set";
  }

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function calculateDays(startDate, endDate) {
  if (!startDate || !endDate) {
    return 0;
  }

  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);

  const difference = end.getTime() - start.getTime();

  if (difference < 0) {
    return 0;
  }

  return Math.floor(difference / (1000 * 60 * 60 * 24)) + 1;
}

function TripDetails() {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const {
    getTripById,
    deleteTrip,
    removeHotelFromTrip,
    removeTransportFromTrip,
  } = useTrips();

  const [showDelete, setShowDelete] = useState(false);

  const trip = getTripById(tripId);

  if (!trip) {
    return (
      <DashboardLayout>
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            <MapPin size={28} />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
            Trip not found
          </h1>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
            This trip may have been deleted or the link may no longer be valid.
          </p>

          <Link
            to="/trips"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sky-50 px-5 py-3 text-sm font-semibold text-blue-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-100 hover:text-blue-800 hover:shadow-md dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20 dark:hover:text-sky-300"
          >
            <ArrowLeft size={16} />
            Back to My Trips
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const days = calculateDays(trip.startDate, trip.endDate);

  /* =========================================================
     BUDGET CALCULATIONS
  ========================================================= */

  // Manual expenses
  const manualExpenses =
    trip.expenses?.reduce(
      (total, expense) => total + Number(expense.amount || 0),
      0,
    ) || 0;

  // Hotel bookings
  const hotelTotal =
    trip.hotels?.reduce(
      (total, hotel) => total + Number(hotel.total || 0),
      0,
    ) || 0;

  // Transport bookings
  const transportTotal =
    trip.transport?.reduce(
      (total, booking) => total + Number(booking.total || 0),
      0,
    ) || 0;

  // Total spending across the complete trip
  const totalExpenses = manualExpenses + hotelTotal + transportTotal;

  // Total trip budget
  const totalBudget = Number(trip.budget || 0);

  // Remaining budget
  const remainingBudget = totalBudget - totalExpenses;

  // Budget progress
  const spentPercentage =
    totalBudget > 0 ? Math.min((totalExpenses / totalBudget) * 100, 100) : 0;

  const isOverBudget = remainingBudget < 0;

  /* =========================================================
     HANDLERS
  ========================================================= */

  const handleDelete = () => {
    deleteTrip(trip.id);
    navigate("/trips");
  };

  const handleRemoveHotel = (bookingId) => {
    removeHotelFromTrip(trip.id, bookingId);
  };

  const handleRemoveTransport = (bookingId) => {
    removeTransportFromTrip(trip.id, bookingId);
  };

  return (
    <DashboardLayout>
      <div className="min-h-full">
        {/* Reusable Trip Header */}
        <TripHeader trip={trip} />

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {/* =====================================================
              HERO
          ====================================================== */}

          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="relative h-72 overflow-hidden sm:h-96">
              {trip.coverImage ? (
                <img
                  src={trip.coverImage}
                  alt={trip.destination || trip.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-700" />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="mb-3 inline-flex rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                  {trip.status === "completed"
                    ? "Completed trip"
                    : "Planned trip"}
                </div>

                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {trip.title}
                </h2>

                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/85">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={16} />

                    {trip.destination || "Destination not set"}

                    {trip.country ? `, ${trip.country}` : ""}
                  </span>

                  {days > 0 && (
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays size={16} />
                      {days} {days === 1 ? "day" : "days"}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col gap-3 border-t border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 dark:border-slate-800">
              <div className="flex flex-wrap gap-3">
                <Link
                  to={`/trips/${trip.id}/edit`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-50 px-4 py-2.5 text-sm font-semibold text-blue-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-100 hover:text-blue-800 hover:shadow-md dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20 dark:hover:text-sky-300"
                >
                  <Edit3 size={16} />
                  Edit Trip
                </Link>

                <button
                  type="button"
                  onClick={() => setShowDelete(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-50 hover:shadow-sm dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/30"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>

              <Link
                to={`/itinerary?trip=${trip.id}`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-sky-50 px-5 text-sm font-semibold text-blue-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-100 hover:text-blue-800 hover:shadow-md dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20 dark:hover:text-sky-300"
              >
                Build Itinerary
              </Link>
            </div>
          </section>

          {/* =====================================================
              MAIN CONTENT
          ====================================================== */}

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {/* ===================================================
                LEFT COLUMN
            ==================================================== */}

            <div className="space-y-6 lg:col-span-2">
              {/* Description */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  About this trip
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                  {trip.description ||
                    "No description has been added to this trip yet."}
                </p>
              </section>

              {/* Trip Stats */}
              <section className="grid gap-4 sm:grid-cols-2">
                {/* Travel Dates */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
                      <CalendarDays size={19} />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        Travel dates
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {formatDate(trip.startDate)}
                      </p>

                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        to {formatDate(trip.endDate)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Travelers */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
                      <Users size={19} />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        Travelers
                      </p>

                      <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                        {trip.travelers || 1}
                      </p>

                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {(trip.travelers || 1) === 1 ? "traveler" : "travelers"}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* =================================================
                  HOTELS
              ================================================== */}

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      Hotel bookings
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {trip.hotels?.length || 0}{" "}
                      {trip.hotels?.length === 1 ? "stay" : "stays"} added to
                      this trip.
                    </p>
                  </div>

                  <Link
                    to={`/hotels?trip=${trip.id}`}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-sky-50 px-4 text-sm font-semibold text-blue-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-100 hover:text-blue-800 dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20 dark:hover:text-sky-300"
                  >
                    <Plus size={16} />
                    Add Hotel
                  </Link>
                </div>

                {trip.hotels && trip.hotels.length > 0 ? (
                  <div className="mt-5 space-y-4">
                    {trip.hotels.map((booking) => (
                      <HotelBookingCard
                        key={booking.id}
                        booking={booking}
                        onRemove={handleRemoveHotel}
                      />
                    ))}

                    {/* Hotel Cost Summary */}
                    <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-700 dark:bg-slate-800/50">
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          Hotel total
                        </p>

                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Total cost of all saved hotel bookings
                        </p>
                      </div>

                      <p className="text-lg font-bold text-slate-900 dark:text-white">
                        ${hotelTotal.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center dark:border-slate-700 dark:bg-slate-800/40">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
                      <MapPin size={20} />
                    </div>

                    <h3 className="mt-4 text-sm font-bold text-slate-900 dark:text-white">
                      No hotel bookings yet
                    </h3>

                    <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-500 dark:text-slate-400">
                      Find a hotel and save your stay here to keep your trip
                      planning organized.
                    </p>

                    <Link
                      to={`/hotels?trip=${trip.id}`}
                      className="mt-5 inline-flex items-center gap-2 rounded-xl bg-sky-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-sky-100 hover:text-blue-800 dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20 dark:hover:text-sky-300"
                    >
                      <Plus size={16} />
                      Find a Hotel
                    </Link>
                  </div>
                )}
              </section>

              {/* =================================================
                  TRANSPORT
              ================================================== */}

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      Transport bookings
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {trip.transport?.length || 0}{" "}
                      {trip.transport?.length === 1 ? "booking" : "bookings"}{" "}
                      added to this trip.
                    </p>
                  </div>

                  <Link
                    to={`/transport?trip=${trip.id}`}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-sky-50 px-4 text-sm font-semibold text-blue-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-100 hover:text-blue-800 dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20 dark:hover:text-sky-300"
                  >
                    <Plus size={16} />
                    Add Transport
                  </Link>
                </div>

                {trip.transport && trip.transport.length > 0 ? (
                  <div className="mt-5 space-y-4">
                    {trip.transport.map((booking) => (
                      <TransportBookingCard
                        key={booking.id}
                        booking={booking}
                        onRemove={handleRemoveTransport}
                      />
                    ))}

                    {/* Transport Cost Summary */}
                    <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-700 dark:bg-slate-800/50">
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          Transport total
                        </p>

                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Total cost of all saved transport bookings
                        </p>
                      </div>

                      <p className="text-lg font-bold text-slate-900 dark:text-white">
                        ${transportTotal.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center dark:border-slate-700 dark:bg-slate-800/40">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
                      <BusFront size={20} />
                    </div>

                    <h3 className="mt-4 text-sm font-bold text-slate-900 dark:text-white">
                      No transport bookings yet
                    </h3>

                    <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-500 dark:text-slate-400">
                      Find a flight, train, bus, or car rental and save it to
                      this trip.
                    </p>

                    <Link
                      to={`/transport?trip=${trip.id}`}
                      className="mt-5 inline-flex items-center gap-2 rounded-xl bg-sky-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-sky-100 hover:text-blue-800 dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20 dark:hover:text-sky-300"
                    >
                      <Plus size={16} />
                      Find Transport
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                )}
              </section>

              {/* =================================================
                  PLANNING SECTIONS
              ================================================== */}

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      Trip planning
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Organize everything for your journey.
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  {/* Itinerary */}
                  <Link
                    to={`/itinerary?trip=${trip.id}`}
                    className="group rounded-2xl border border-slate-200 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-200 hover:bg-sky-50/70 hover:shadow-sm dark:border-slate-700 dark:hover:border-sky-800 dark:hover:bg-sky-950/20"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600 transition dark:bg-sky-500/10 dark:text-sky-400">
                      <CalendarDays size={18} />
                    </div>

                    <p className="mt-4 text-sm font-bold text-slate-900 dark:text-white">
                      Itinerary
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                      {trip.activities?.length || 0} activities planned
                    </p>
                  </Link>

                  {/* Hotels */}
                  <Link
                    to={`/hotels?trip=${trip.id}`}
                    className="group rounded-2xl border border-slate-200 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-200 hover:bg-sky-50/70 hover:shadow-sm dark:border-slate-700 dark:hover:border-sky-800 dark:hover:bg-sky-950/20"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600 transition dark:bg-sky-500/10 dark:text-sky-400">
                      <MapPin size={18} />
                    </div>

                    <p className="mt-4 text-sm font-bold text-slate-900 dark:text-white">
                      Hotels
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                      {trip.hotels?.length || 0} stays added
                    </p>
                  </Link>

                  {/* Transport */}
                  <Link
                    to={`/transport?trip=${trip.id}`}
                    className="group rounded-2xl border border-slate-200 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-200 hover:bg-sky-50/70 hover:shadow-sm dark:border-slate-700 dark:hover:border-sky-800 dark:hover:bg-sky-950/20"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600 transition dark:bg-sky-500/10 dark:text-sky-400">
                      <BusFront size={18} />
                    </div>

                    <p className="mt-4 text-sm font-bold text-slate-900 dark:text-white">
                      Transport
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                      {trip.transport?.length || 0} bookings added
                    </p>
                  </Link>
                </div>
              </section>
            </div>

            {/* ===================================================
                RIGHT COLUMN - BUDGET
            ==================================================== */}

            <aside>
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      Budget
                    </h2>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Complete trip spending overview
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
                    <DollarSign size={19} />
                  </div>
                </div>

                {/* Total Budget */}
                <div className="mt-6">
                  <p className="text-xs text-slate-400">Total budget</p>

                  <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
                    ${totalBudget.toLocaleString()}
                  </p>
                </div>

                {/* Total Spent */}
                <div className="mt-6 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400">Total spent</p>

                      <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                        ${totalExpenses.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
                      <DollarSign size={18} />
                    </div>
                  </div>
                </div>

                {/* Spending Breakdown */}
                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <ReceiptText size={14} />
                      Manual expenses
                    </span>

                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                      ${manualExpenses.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <Hotel size={14} />
                      Hotels
                    </span>

                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                      ${hotelTotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <BusFront size={14} />
                      Transport
                    </span>

                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                      ${transportTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Progress */}
                <div className="mt-6 space-y-4">
                  <div>
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">
                        Budget used
                      </span>

                      <span className="font-semibold text-slate-700 dark:text-slate-200">
                        {spentPercentage.toFixed(0)}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isOverBudget ? "bg-red-500" : "bg-sky-500"
                        }`}
                        style={{
                          width: `${spentPercentage}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Remaining */}
                  <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {isOverBudget ? "Over budget" : "Remaining"}
                    </span>

                    <span
                      className={`text-sm font-bold ${
                        isOverBudget
                          ? "text-red-500"
                          : "text-emerald-600 dark:text-emerald-400"
                      }`}
                    >
                      ${Math.abs(remainingBudget).toLocaleString()}
                      {isOverBudget ? " over" : ""}
                    </span>
                  </div>
                </div>

                {/* Budget Button */}
                <Link
                  to={`/budget?trip=${trip.id}`}
                  className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-sky-50 px-4 text-sm font-semibold text-blue-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-100 hover:text-blue-800 hover:shadow-md dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20 dark:hover:text-sky-300"
                >
                  Manage Budget
                  <ArrowRight size={16} />
                </Link>
              </section>
            </aside>
          </div>
        </div>

        {/* =======================================================
            DELETE CONFIRMATION
        ======================================================== */}

        {showDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400">
                <Trash2 size={21} />
              </div>

              <h2 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                Delete this trip?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                This will permanently remove{" "}
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {trip.title}
                </span>{" "}
                and its saved planning data.
              </p>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button
                  variant="secondary"
                  onClick={() => setShowDelete(false)}
                >
                  Cancel
                </Button>

                <button
                  type="button"
                  onClick={handleDelete}
                  className="inline-flex items-center justify-center rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  Delete Trip
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default TripDetails;
