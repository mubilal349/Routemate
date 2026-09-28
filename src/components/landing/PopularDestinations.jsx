import { ArrowUpRight, MapPin } from "lucide-react";

const destinations = [
  {
    name: "Paris",
    country: "France",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Dubai",
    country: "United Arab Emirates",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Bali",
    country: "Indonesia",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85",
  },
];

function PopularDestinations() {
  return (
    <section id="destinations" className="bg-slate-950 py-24 text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-sky-400">
              Get inspired
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Places worth planning for
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-slate-400">
            Discover destinations and turn your next idea into a structured
            adventure with RouteMate.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {destinations.map((destination) => (
            <div
              key={destination.name}
              className="group relative overflow-hidden rounded-3xl"
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="h-[390px] w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-sm text-slate-300">
                      <MapPin size={14} />
                      {destination.country}
                    </div>

                    <h3 className="mt-1 text-2xl font-bold">
                      {destination.name}
                    </h3>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-950 transition group-hover:scale-110">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularDestinations;
