import { CalendarCheck2, Hotel, Map, WalletCards } from "lucide-react";

const features = [
  {
    icon: CalendarCheck2,
    title: "Smart Itineraries",
    description:
      "Organize your trip day by day and keep every activity exactly where it belongs.",
  },
  {
    icon: Map,
    title: "Interactive Maps",
    description:
      "Visualize destinations and activities on an interactive map while planning your route.",
  },
  {
    icon: Hotel,
    title: "Hotels & Transport",
    description:
      "Keep accommodation and transportation details together with the rest of your trip.",
  },
  {
    icon: WalletCards,
    title: "Budget Tracking",
    description:
      "Track expenses, monitor your budget, and understand where your travel money goes.",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="border-y border-slate-100 bg-slate-50 py-24 dark:border-white/5 dark:bg-slate-900/40"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400">
            Everything in one place
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
            Everything you need for a better trip
          </h2>

          <p className="mt-4 text-slate-600 dark:text-slate-300">
            RouteMate turns complicated travel planning into a simple, organized
            experience.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 dark:border-white/10 dark:bg-slate-900"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600 transition group-hover:bg-sky-600 group-hover:text-white dark:bg-sky-500/10 dark:text-sky-400 dark:group-hover:bg-sky-500 dark:group-hover:text-white">
                  <Icon size={23} />
                </div>

                <h3 className="mt-6 text-lg font-bold text-slate-950 dark:text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;
