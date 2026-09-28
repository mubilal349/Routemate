import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Compass,
  MapPin,
  Navigation,
  Search,
  Star,
  Wallet,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import TripMap from "../../components/map/TripMap";
import destinations from "../../data/destinations";

function Map() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");
  const [selectedDestination, setSelectedDestination] = useState(null);

  const regions = useMemo(() => {
    return [
      "All",
      ...new Set(destinations.map((destination) => destination.region)),
    ];
  }, []);

  const filteredDestinations = useMemo(() => {
    const query = search.trim().toLowerCase();

    return destinations.filter((destination) => {
      const matchesSearch =
        !query ||
        destination.name.toLowerCase().includes(query) ||
        destination.country.toLowerCase().includes(query) ||
        destination.region.toLowerCase().includes(query);

      const matchesRegion = region === "All" || destination.region === region;

      return matchesSearch && matchesRegion;
    });
  }, [search, region]);

  const handleSelectDestination = (destination) => {
    setSelectedDestination(destination);
  };

  const handleExploreDestination = (destination) => {
    setSelectedDestination(destination);
  };

  return (
    <DashboardLayout>
      {" "}
      <div className="w-full min-w-0 px-4 py-6 sm:px-6 lg:px-8">
        {" "}
        <div className="mx-auto w-full max-w-[1600px] space-y-6">
          {/* HEADER */}{" "}
          <section>
            {" "}
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              {" "}
              <div>
                {" "}
                <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-sky-400">
                  {" "}
                  <Compass size={17} /> <span>Explore</span>{" "}
                </div>
                <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                  Explore Maps
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Discover destinations around the world, explore interesting
                  places, and find inspiration for your next adventure.
                </p>
              </div>
              <Link
                to="/trips/create"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-sky-50 px-5 text-sm font-semibold text-blue-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-100 hover:text-blue-800 hover:shadow-md dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20 dark:hover:text-sky-300"
              >
                <Navigation size={17} />
                Plan a Trip
              </Link>
            </div>
          </section>
          {/* SEARCH + FILTERS */}
          <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="relative min-w-0 flex-1">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search destinations, countries..."
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-medium text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1">
                {regions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setRegion(item)}
                    className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                      region === item
                        ? "bg-sky-50 text-blue-700 dark:bg-sky-500/10 dark:text-sky-400"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </section>
          {/* MAIN CONTENT */}
          <section className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
            {/* MAP */}
            <TripMap
              destinations={filteredDestinations}
              selectedDestination={selectedDestination}
              onSelectDestination={handleSelectDestination}
              onExploreDestination={handleExploreDestination}
            />

            {/* DESTINATION SIDEBAR */}
            <div className="min-w-0">
              <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      Destinations
                    </h2>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {filteredDestinations.length} places to explore
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-blue-600 dark:bg-sky-500/10 dark:text-sky-400">
                    <MapPin size={18} />
                  </div>
                </div>

                <div className="mt-5 max-h-[610px] space-y-3 overflow-y-auto pr-1">
                  {filteredDestinations.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-300 px-5 py-10 text-center dark:border-slate-700">
                      <Search size={24} className="mx-auto text-slate-400" />

                      <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
                        No destinations found
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                        Try another destination or region.
                      </p>
                    </div>
                  ) : (
                    filteredDestinations.map((destination) => {
                      const isSelected =
                        selectedDestination?.id === destination.id;

                      return (
                        <button
                          key={destination.id}
                          type="button"
                          onClick={() => handleSelectDestination(destination)}
                          className={`group flex w-full gap-3 rounded-2xl border p-3 text-left transition-all ${
                            isSelected
                              ? "border-sky-300 bg-sky-50/70 shadow-sm dark:border-sky-500/40 dark:bg-sky-500/10"
                              : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
                          }`}
                        >
                          <img
                            src={destination.image}
                            alt={destination.name}
                            className="h-20 w-20 shrink-0 rounded-xl object-cover"
                          />

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <h3 className="truncate text-sm font-bold text-slate-900 dark:text-white">
                                  {destination.name}
                                </h3>

                                <div className="mt-1 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                                  <MapPin size={12} />
                                  <span className="truncate">
                                    {destination.country}
                                  </span>
                                </div>
                              </div>

                              <div className="flex shrink-0 items-center gap-1 text-xs font-semibold text-amber-500">
                                <Star size={12} fill="currentColor" />
                                {destination.rating}
                              </div>
                            </div>

                            <div className="mt-3 flex items-center justify-between">
                              <span className="text-xs font-medium text-slate-400">
                                From
                              </span>

                              <span className="text-sm font-bold text-slate-900 dark:text-white">
                                ${destination.averageBudget}
                                <span className="text-[10px] font-medium text-slate-400">
                                  /day
                                </span>
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </section>
          {/* SELECTED DESTINATION */}
          {selectedDestination && (
            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="grid lg:grid-cols-[360px_minmax(0,1fr)]">
                <img
                  src={selectedDestination.image}
                  alt={selectedDestination.name}
                  className="h-64 w-full object-cover lg:h-full lg:min-h-[330px]"
                />

                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-lg bg-sky-50 px-3 py-1.5 text-xs font-bold text-blue-700 dark:bg-sky-500/10 dark:text-sky-400">
                      {selectedDestination.region}
                    </span>

                    <span className="flex items-center gap-1 rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                      <Star size={12} fill="currentColor" />
                      {selectedDestination.rating}
                    </span>
                  </div>

                  <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                    {selectedDestination.name}
                  </h2>

                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <MapPin size={16} />
                    {selectedDestination.country}
                  </div>

                  <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-500 dark:text-slate-400">
                    {selectedDestination.description}
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                      <CalendarDays
                        size={18}
                        className="text-blue-600 dark:text-sky-400"
                      />

                      <p className="mt-2 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                        Best Time
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                        {selectedDestination.bestTime}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                      <Wallet
                        size={18}
                        className="text-blue-600 dark:text-sky-400"
                      />

                      <p className="mt-2 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                        Daily Budget
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                        ${selectedDestination.averageBudget}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                      <MapPin
                        size={18}
                        className="text-blue-600 dark:text-sky-400"
                      />

                      <p className="mt-2 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                        Location
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                        {selectedDestination.latitude.toFixed(2)},{" "}
                        {selectedDestination.longitude.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Popular activities
                    </h3>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedDestination.activities.map((activity) => (
                        <span
                          key={activity}
                          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-7">
                    <Link
                      to={`/trips/create?destination=${encodeURIComponent(
                        selectedDestination.name,
                      )}`}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-sky-50 px-5 text-sm font-semibold text-blue-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-100 hover:text-blue-800 hover:shadow-md dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20 dark:hover:text-sky-300"
                    >
                      <Navigation size={17} />
                      Plan a Trip Here
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}
          {/* EMPTY SELECTED STATE */}
          {!selectedDestination && (
            <section className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center dark:border-slate-700 dark:bg-slate-900">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-blue-600 dark:bg-sky-500/10 dark:text-sky-400">
                <MapPin size={24} />
              </div>

              <h2 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                Select a destination
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                Click a marker on the map or choose a destination from the list
                to explore more details.
              </p>
            </section>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Map;
