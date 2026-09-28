import { useEffect, useMemo, useState } from "react";
import { CalendarDays, DollarSign, FileText, Tag, X } from "lucide-react";

const expenseCategories = [
  "Food",
  "Transport",
  "Accommodation",
  "Activities",
  "Shopping",
  "Tickets",
  "Other",
];

function ExpenseForm({ trips = [], initialTripId = "", onClose, onSuccess }) {
  const [tripId, setTripId] = useState(initialTripId || trips[0]?.id || "");

  const [formData, setFormData] = useState({
    title: "",
    category: "Food",
    amount: "",
    currency: "USD",
    date: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setTripId(initialTripId || trips[0]?.id || "");
  }, [initialTripId, trips]);

  const selectedTrip = useMemo(() => {
    return trips.find((trip) => trip.id === tripId);
  }, [trips, tripId]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!tripId) {
      nextErrors.tripId = "Please select a trip.";
    }

    if (!formData.title.trim()) {
      nextErrors.title = "Expense title is required.";
    }

    if (!formData.amount) {
      nextErrors.amount = "Please enter an amount.";
    } else if (Number(formData.amount) <= 0) {
      nextErrors.amount = "Amount must be greater than 0.";
    }

    if (!formData.date) {
      nextErrors.date = "Please select a date.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSaving(true);

    const expense = {
      title: formData.title.trim(),
      category: formData.category,
      amount: Number(formData.amount),
      currency: formData.currency,
      date: formData.date,
      notes: formData.notes.trim(),
    };

    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);

      onSuccess?.({
        tripId,
        expense,
      });

      setTimeout(() => {
        onClose?.();
      }, 800);
    }, 350);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose?.();
        }
      }}
    >
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Add Expense
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Record a new expense for your trip.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Trip */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
              Trip
            </label>

            <select
              value={tripId}
              onChange={(event) => setTripId(event.target.value)}
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            >
              <option value="">Select a trip</option>

              {trips.map((trip) => (
                <option key={trip.id} value={trip.id}>
                  {trip.title || trip.name || "Untitled Trip"}
                </option>
              ))}
            </select>

            {errors.tripId && (
              <p className="mt-1.5 text-xs font-medium text-red-500">
                {errors.tripId}
              </p>
            )}
          </div>

          {/* Selected trip info */}
          {selectedTrip && (
            <div className="rounded-2xl border border-sky-100 bg-sky-50 p-4 dark:border-sky-500/20 dark:bg-sky-500/10">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-sky-400">
                Adding expense to
              </p>

              <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                {selectedTrip.title || selectedTrip.name || "Untitled Trip"}
              </p>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
              Expense Title
            </label>

            <div className="relative">
              <FileText
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Dinner at restaurant"
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </div>

            {errors.title && (
              <p className="mt-1.5 text-xs font-medium text-red-500">
                {errors.title}
              </p>
            )}
          </div>

          {/* Category + Amount */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Category
              </label>

              <div className="relative">
                <Tag
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                >
                  {expenseCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Amount
              </label>

              <div className="relative">
                <DollarSign
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="number"
                  name="amount"
                  min="0"
                  step="0.01"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              {errors.amount && (
                <p className="mt-1.5 text-xs font-medium text-red-500">
                  {errors.amount}
                </p>
              )}
            </div>
          </div>

          {/* Currency + Date */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Currency
              </label>

              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              >
                <option value="USD">USD — US Dollar</option>
                <option value="EUR">EUR — Euro</option>
                <option value="GBP">GBP — British Pound</option>
                <option value="PKR">PKR — Pakistani Rupee</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Date
              </label>

              <div className="relative">
                <CalendarDays
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              {errors.date && (
                <p className="mt-1.5 text-xs font-medium text-red-500">
                  {errors.date}
                </p>
              )}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
              Notes
              <span className="ml-1 font-normal text-slate-400">
                (optional)
              </span>
            </label>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              placeholder="Add any additional details..."
              className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </div>

          {/* Selected amount */}
          {formData.amount && Number(formData.amount) > 0 && (
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4 dark:bg-slate-800/60">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Expense total
              </span>

              <span className="text-lg font-bold text-slate-900 dark:text-white">
                {formData.currency}{" "}
                {Number(formData.amount).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-xl px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving || saved}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-sky-50 px-5 text-sm font-semibold text-blue-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-100 hover:text-blue-800 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20 dark:hover:text-sky-300"
            >
              {saved ? "Expense Added" : isSaving ? "Saving..." : "Add Expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExpenseForm;
