import TripCard from "./TripCard";

function TripGrid({
  trips = [],
  emptyTitle = "No trips found",
  emptyDescription = "Create your first trip to start planning your next adventure.",
}) {
  if (trips.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
          <span className="text-2xl">✈</span>
        </div>

        <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
          {emptyTitle}
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
          {emptyDescription}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
}

export default TripGrid;
