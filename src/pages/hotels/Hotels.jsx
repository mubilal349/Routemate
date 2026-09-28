import { useMemo, useState } from "react";
import {
  Building2,
  Filter,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import HotelBookingForm from "../../components/hotels/HotelForm";
import HotelList from "../../components/hotels/HotelList";
import hotels from "../../data/hotel";

function Hotels() {
  const [search, setSearch] = useState("");
  const [rating, setRating] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const [bookingHotel, setBookingHotel] = useState(null);

  const filteredHotels = useMemo(() => {
    let result = [...hotels];

    const query = search.trim().toLowerCase();

    if (query) {
      result = result.filter(
        (hotel) =>
          hotel.name.toLowerCase().includes(query) ||
          hotel.location.toLowerCase().includes(query) ||
          hotel.city.toLowerCase().includes(query) ||
          hotel.country.toLowerCase().includes(query),
      );
    }

    if (rating !== "all") {
      result = result.filter((hotel) => hotel.rating >= Number(rating));
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => a.pricePerNight - b.pricePerNight);
    }

    if (sortBy === "price-high") {
      result.sort((a, b) => b.pricePerNight - a.pricePerNight);
    }

    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [search, rating, sortBy]);

  const averageRating = hotels.length
    ? (
        hotels.reduce((total, hotel) => total + hotel.rating, 0) / hotels.length
      ).toFixed(1)
    : "0.0";

  const averagePrice = hotels.length
    ? Math.round(
        hotels.reduce((total, hotel) => total + hotel.pricePerNight, 0) /
          hotels.length,
      )
    : 0;

  return (
    <DashboardLayout>
      {/* =====================================================
          PAGE CONTAINER
      ====================================================== */}
      <div className="w-full min-w-0 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto w-full min-w-0 max-w-[1600px] space-y-8">
          {/* =====================================================
              HERO
          ====================================================== */}
          <section className="relative w-full min-w-0 overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-sky-50 via-white to-blue-50 px-5 py-7 shadow-sm sm:px-8 sm:py-10 dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-sky-950/30">
            {/* Decorative glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-sky-200/40 blur-3xl dark:bg-sky-500/10" />

            <div className="pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-500/10" />

            <div className="relative w-full min-w-0">
              {/* Hero top */}
              <div className="flex w-full min-w-0 flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
                {/* Heading */}
                <div className="min-w-0 max-w-2xl">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-blue-700 shadow-sm dark:bg-slate-800 dark:text-sky-400">
                    <Sparkles size={14} />
                    Stay Planning
                  </div>

                  <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                    Find the perfect place
                    <span className="block text-blue-600 dark:text-sky-400">
                      to stay.
                    </span>
                  </h1>

                  <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base dark:text-slate-400">
                    Explore hand-picked stays for your journey. Compare ratings,
                    prices, and amenities before adding a hotel to your trip.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid w-full grid-cols-3 gap-2 sm:gap-3 lg:w-auto lg:shrink-0">
                  {/* Stays */}
                  <div className="min-w-0 rounded-2xl border border-white/80 bg-white/80 p-3 backdrop-blur sm:p-4 dark:border-slate-700/70 dark:bg-slate-900/70">
                    <Building2
                      size={17}
                      className="text-blue-600 dark:text-sky-400"
                    />

                    <p className="mt-3 truncate text-lg font-bold text-slate-900 sm:text-xl dark:text-white">
                      {hotels.length}
                    </p>

                    <p className="text-[11px] text-slate-500 sm:text-xs dark:text-slate-400">
                      Stays
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="min-w-0 rounded-2xl border border-white/80 bg-white/80 p-3 backdrop-blur sm:p-4 dark:border-slate-700/70 dark:bg-slate-900/70">
                    <Star size={17} className="fill-current text-amber-500" />

                    <p className="mt-3 truncate text-lg font-bold text-slate-900 sm:text-xl dark:text-white">
                      {averageRating}
                    </p>

                    <p className="text-[11px] text-slate-500 sm:text-xs dark:text-slate-400">
                      Avg. rating
                    </p>
                  </div>

                  {/* Price */}
                  <div className="min-w-0 rounded-2xl border border-white/80 bg-white/80 p-3 backdrop-blur sm:p-4 dark:border-slate-700/70 dark:bg-slate-900/70">
                    <span className="text-sm font-bold text-blue-600 dark:text-sky-400">
                      $
                    </span>

                    <p className="mt-3 truncate text-lg font-bold text-slate-900 sm:text-xl dark:text-white">
                      {averagePrice}
                    </p>

                    <p className="text-[11px] text-slate-500 sm:text-xs dark:text-slate-400">
                      Avg. / night
                    </p>
                  </div>
                </div>
              </div>

              {/* Search */}
              <div className="relative mt-8 w-full max-w-3xl">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by hotel, city, or destination..."
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-5 text-sm text-slate-900 shadow-lg shadow-slate-900/5 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
                />
              </div>
            </div>
          </section>

          {/* =====================================================
              FILTERS
          ====================================================== */}
          <section className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex w-full min-w-0 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-blue-600 dark:bg-sky-500/10 dark:text-sky-400">
                  <SlidersHorizontal size={18} />
                </div>

                <div>
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                    Refine your search
                  </h2>

                  <p className="text-xs text-slate-400">
                    Find a stay that fits your trip
                  </p>
                </div>
              </div>

              <div className="flex min-w-0 flex-col gap-3 sm:flex-row">
                {/* Rating */}
                <div className="relative min-w-0">
                  <Star
                    size={15}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <select
                    value={rating}
                    onChange={(event) => setRating(event.target.value)}
                    className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-9 text-sm font-medium text-slate-700 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 sm:w-40 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                  >
                    <option value="all">All ratings</option>
                    <option value="4.5">4.5+ rating</option>
                    <option value="4.7">4.7+ rating</option>
                    <option value="4.8">4.8+ rating</option>
                  </select>
                </div>

                {/* Sort */}
                <div className="relative min-w-0">
                  <Filter
                    size={15}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                    className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-9 text-sm font-medium text-slate-700 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 sm:w-48 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                  >
                    <option value="recommended">Recommended</option>

                    <option value="rating">Highest rated</option>

                    <option value="price-low">Price: Low to High</option>

                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* =====================================================
              RESULTS HEADER
          ====================================================== */}
          <div className="flex w-full min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Recommended stays
                </h2>

                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  {filteredHotels.length}
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Browse available accommodation options for your journey.
              </p>
            </div>

            {selectedHotelId && (
              <div className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl bg-sky-50 px-3.5 py-2 text-xs font-bold text-blue-700 dark:bg-sky-500/10 dark:text-sky-400">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                Hotel selected
              </div>
            )}
          </div>

          {/* =====================================================
              HOTEL LIST
          ====================================================== */}
          <div className="w-full min-w-0">
            <HotelList
              hotels={filteredHotels}
              selectedHotelId={selectedHotelId}
              onSelectHotel={(hotel) => {
                setSelectedHotelId(hotel.id);
                setBookingHotel(hotel);
              }}
            />
          </div>
          {bookingHotel && (
            <HotelBookingForm
              hotel={bookingHotel}
              onClose={() => setBookingHotel(null)}
              onSuccess={() => {
                setSelectedHotelId(bookingHotel.id);
              }}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Hotels;
