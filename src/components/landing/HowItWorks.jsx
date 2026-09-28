const steps = [
  {
    number: "01",
    title: "Create your trip",
    description:
      "Choose your destination, dates, and basic trip details to get started.",
  },
  {
    number: "02",
    title: "Build your itinerary",
    description:
      "Add activities, organize them by day, and move them around with drag and drop.",
  },
  {
    number: "03",
    title: "Travel with confidence",
    description:
      "Keep your map, hotels, transport, expenses, and itinerary together in one place.",
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400">
              Simple workflow
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
              From idea to itinerary in minutes.
            </h2>

            <p className="mt-5 max-w-lg leading-7 text-slate-600 dark:text-slate-300">
              RouteMate gives you a structured workspace for turning a
              destination idea into a complete travel plan.
            </p>
          </div>

          <div className="space-y-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-900"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white dark:bg-white dark:text-slate-950">
                  {step.number}
                </div>

                <div>
                  <h3 className="font-bold text-slate-950 dark:text-white">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
