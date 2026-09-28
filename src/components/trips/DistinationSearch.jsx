import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import destinations from "../../data/destinations";
import DestinationCard from "./DestinationCard";

function DestinationSearch() {
  const [search, setSearch] = useState("");

  const filteredDestinations = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return destinations;
    }

    return destinations.filter((destination) =>
      [destination.name, destination.country, destination.region].some(
        (value) => value.toLowerCase().includes(query),
      ),
    );
  }, [search]);

  return (
    <section className="space-y-6">
      <div className="relative mx-auto max-w-2xl">
        <Search
          size={20}
          className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search destinations, countries, or regions..."
          className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-14 pr-12 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
        />

        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            aria-label="Clear search"
            className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <X size={17} />
          </button>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Explore destinations
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Find inspiration for your next adventure.
          </p>
        </div>

        <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 sm:inline-flex dark:bg-slate-800 dark:text-slate-300">
          {filteredDestinations.length} destinations
        </span>
      </div>

      {filteredDestinations.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
          <Search size={32} className="mx-auto text-slate-400" />

          <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
            No destinations found
          </h3>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Try searching for another destination or country.
          </p>
        </div>
      )}
    </section>
  );
}

export default DestinationSearch;
