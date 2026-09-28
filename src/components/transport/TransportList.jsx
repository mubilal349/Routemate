import { BusFront } from "lucide-react";

import TransportCard from "./TransportCard";

function TransportList({ transports, selectedTransportId, onSelectTransport }) {
  if (!transports || transports.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
          <BusFront size={24} />
        </div>

        <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
          No transport found
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
          We couldn't find any transport matching your current search or
          filters. Try a different route or adjust your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {transports.map((item) => (
        <TransportCard
          key={item.id}
          transport={item}
          selected={item.id === selectedTransportId}
          onSelect={onSelectTransport}
        />
      ))}
    </div>
  );
}

export default TransportList;
