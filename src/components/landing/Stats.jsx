function Stats() {
  const stats = [
    ["10K+", "Trips planned"],
    ["150+", "Destinations"],
    ["25K+", "Activities organized"],
    ["98%", "Planning satisfaction"],
  ];

  return (
    <section id="about" className="py-20">
      {" "}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {" "}
        <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 sm:grid-cols-2 lg:grid-cols-4 dark:border-white/10 dark:bg-slate-900">
          {stats.map(([value, label]) => (
            <div
              key={label}
              className="border-b border-slate-200 p-8 last:border-b-0 sm:nth-[3]:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0 dark:border-white/10"
            >
              {" "}
              <p className="text-3xl font-bold text-slate-950 dark:text-white">
                {value}{" "}
              </p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
