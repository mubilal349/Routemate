import {
  ArrowRight,
  BusFront,
  CarFront,
  Filter,
  Plane,
  Search,
  TrainFront,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import TransportForm from "../../components/transport/TransportForm";
import TransportList from "../../components/transport/TransportList";
import transportData from "../../data/transport";

const transportTypes = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "flight",
    label: "Flights",
    icon: Plane,
  },
  {
    value: "train",
    label: "Trains",
    icon: TrainFront,
  },
  {
    value: "bus",
    label: "Buses",
    icon: BusFront,
  },
  {
    value: "car",
    label: "Car Rental",
    icon: CarFront,
  },
];

function Transport() {
  const location = useLocation();

  const tripId = new URLSearchParams(location.search).get("trip") || "";

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("price-low");

  const [selectedTransportId, setSelectedTransportId] = useState(null);

  const [bookingTransport, setBookingTransport] = useState(null);

  const filteredTransport = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    let results = transportData.filter((item) => {
      const matchesSearch =
        !normalizedSearch ||
        item.name.toLowerCase().includes(normalizedSearch) ||
        item.provider.toLowerCase().includes(normalizedSearch) ||
        item.from.toLowerCase().includes(normalizedSearch) ||
        item.to.toLowerCase().includes(normalizedSearch);

      const matchesType = typeFilter === "all" || item.type === typeFilter;

      return matchesSearch && matchesType;
    });

    return [...results].sort((a, b) => {
      if (sortBy === "price-high") {
        return b.price - a.price;
      }

      if (sortBy === "date") {
        return new Date(a.departureDate) - new Date(b.departureDate);
      }

      return a.price - b.price;
    });
  }, [search, typeFilter, sortBy]);

  const totalOptions = transportData.length;

  const flightCount = transportData.filter(
    (item) => item.type === "flight",
  ).length;

  const trainCount = transportData.filter(
    (item) => item.type === "train",
  ).length;

  const busCount = transportData.filter((item) => item.type === "bus").length;

  const carCount = transportData.filter((item) => item.type === "car").length;

  return (
    <DashboardLayout>
      <div className="w-full min-w-0 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto w-full min-w-0 max-w-[1600px] space-y-8">
          {/* Hero */}
          <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />

            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1.5 text-xs font-bold text-blue-700 dark:bg-sky-500/10 dark:text-sky-400">
                  <BusFront size={14} />
                  Travel transportation
                </div>

                <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                  Plan every journey between destinations.
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base dark:text-slate-400">
                  Compare flights, trains, buses, and car rentals, then save
                  your transportation directly to your trip.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/trips"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-sky-50 px-5 text-sm font-semibold text-blue-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-100 hover:text-blue-800 hover:shadow-md dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20 dark:hover:text-sky-300"
                  >
                    View My Trips
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              <div className="hidden lg:flex">
                <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
                  <Plane size={48} strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs font-medium text-slate-400">
                Transport options
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                {totalOptions}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs font-medium text-slate-400">Flights</p>

              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                {flightCount}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs font-medium text-slate-400">Trains</p>

              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                {trainCount}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs font-medium text-slate-400">Buses</p>

              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                {busCount}
              </p>
            </div>
          </section>

          {/* Filters */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              {/* Search */}
              <div className="relative w-full xl:max-w-xl">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search provider, route, or destination..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-800"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex items-center gap-2">
                  <Filter size={16} className="text-slate-400" />

                  <select
                    value={typeFilter}
                    onChange={(event) => setTypeFilter(event.target.value)}
                    className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-sky-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    {transportTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-sky-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  <option value="price-low">Price: Low to High</option>

                  <option value="price-high">Price: High to Low</option>

                  <option value="date">Departure Date</option>
                </select>
              </div>
            </div>

            {/* Type Pills */}
            <div className="mt-5 flex flex-wrap gap-2">
              {transportTypes.map((type) => {
                const Icon = type.icon;
                const active = typeFilter === type.value;

                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setTypeFilter(type.value)}
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition ${
                      active
                        ? "bg-sky-50 text-blue-700 dark:bg-sky-500/10 dark:text-sky-400"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                    }`}
                  >
                    {Icon && <Icon size={14} />}
                    {type.label}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Results */}
          <section>
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Available transport
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {filteredTransport.length} options available
                </p>
              </div>
            </div>

            <TransportList
              transports={filteredTransport}
              selectedTransportId={selectedTransportId}
              onSelectTransport={(item) => {
                setSelectedTransportId(item.id);
                setBookingTransport(item);
              }}
            />
          </section>
        </div>
      </div>

      {/* Booking Modal */}
      {bookingTransport && (
        <TransportForm
          transport={bookingTransport}
          initialTripId={tripId}
          onClose={() => setBookingTransport(null)}
          onSuccess={() => {
            setSelectedTransportId(bookingTransport.id);
          }}
        />
      )}
    </DashboardLayout>
  );
}

export default Transport;
