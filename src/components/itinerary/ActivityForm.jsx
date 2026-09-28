import { useEffect, useState } from "react";
import { X } from "lucide-react";

function ActivityForm({ isOpen, onClose, onSubmit, initialData = null }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "Sightseeing",
    location: "",
    startTime: "",
    endTime: "",
    estimatedCost: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setFormData({
      title: initialData?.title || "",
      category: initialData?.category || "Sightseeing",
      location: initialData?.location || "",
      startTime: initialData?.startTime || "",
      endTime: initialData?.endTime || "",
      estimatedCost: initialData?.estimatedCost ?? "",
      notes: initialData?.notes || "",
    });

    setErrors({});
  }, [isOpen, initialData]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Activity title is required.";
    }

    if (
      formData.startTime &&
      formData.endTime &&
      formData.endTime < formData.startTime
    ) {
      newErrors.endTime = "End time cannot be before start time.";
    }

    if (Number(formData.estimatedCost) < 0) {
      newErrors.estimatedCost = "Cost cannot be negative.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit({
      title: formData.title.trim(),
      category: formData.category,
      location: formData.location.trim(),
      startTime: formData.startTime,
      endTime: formData.endTime,
      estimatedCost: Number(formData.estimatedCost) || 0,
      notes: formData.notes.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div
        className="w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900"
        role="dialog"
        aria-modal="true"
        aria-labelledby="activity-form-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">
          <div>
            <h2
              id="activity-form-title"
              className="text-lg font-bold text-slate-900 dark:text-white"
            >
              {initialData ? "Edit Activity" : "Add Activity"}
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Add details about this itinerary activity.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500/30 dark:hover:bg-slate-800 dark:hover:text-white"
            aria-label="Close"
          >
            <X size={19} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-h-[75vh] overflow-y-auto">
          <div className="grid gap-5 p-6 sm:grid-cols-2">
            {/* Activity Title */}
            <div className="sm:col-span-2">
              <label
                htmlFor="activity-title"
                className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
              >
                Activity title
              </label>

              <input
                id="activity-title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Visit Baltit Fort"
                className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-slate-50 focus:ring-4 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 dark:focus:bg-slate-950 ${
                  errors.title
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500/10 dark:border-red-900"
                    : "border-slate-200 focus:border-sky-500 focus:ring-sky-500/10 dark:border-slate-700"
                }`}
              />

              {errors.title && (
                <p className="mt-1.5 text-xs font-medium text-red-500">
                  {errors.title}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="activity-category"
                className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
              >
                Category
              </label>

              <select
                id="activity-category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-sky-500 focus:bg-slate-50 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:focus:border-sky-500 dark:focus:bg-slate-950"
              >
                <option value="Sightseeing">Sightseeing</option>
                <option value="Food">Food</option>
                <option value="Adventure">Adventure</option>
                <option value="Shopping">Shopping</option>
                <option value="Transport">Transport</option>
                <option value="Hotel">Hotel</option>
                <option value="Relaxation">Relaxation</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="activity-location"
                className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
              >
                Location
              </label>

              <input
                id="activity-location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Karimabad"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:bg-slate-50 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-sky-500 dark:focus:bg-slate-950"
              />
            </div>

            {/* Start Time */}
            <div>
              <label
                htmlFor="activity-start"
                className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
              >
                Start time
              </label>

              <input
                id="activity-start"
                name="startTime"
                type="time"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-slate-50 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-sky-500 dark:focus:bg-slate-950"
              />
            </div>

            {/* End Time */}
            <div>
              <label
                htmlFor="activity-end"
                className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
              >
                End time
              </label>

              <input
                id="activity-end"
                name="endTime"
                type="time"
                value={formData.endTime}
                onChange={handleChange}
                className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:bg-slate-50 focus:ring-4 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-950 ${
                  errors.endTime
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500/10 dark:border-red-900"
                    : "border-slate-200 focus:border-sky-500 focus:ring-sky-500/10 dark:border-slate-700"
                }`}
              />

              {errors.endTime && (
                <p className="mt-1.5 text-xs font-medium text-red-500">
                  {errors.endTime}
                </p>
              )}
            </div>

            {/* Estimated Cost */}
            <div>
              <label
                htmlFor="activity-cost"
                className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
              >
                Estimated cost (USD)
              </label>

              <input
                id="activity-cost"
                name="estimatedCost"
                type="number"
                min="0"
                value={formData.estimatedCost}
                onChange={handleChange}
                placeholder="50"
                className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-slate-50 focus:ring-4 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 dark:focus:bg-slate-950 ${
                  errors.estimatedCost
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500/10 dark:border-red-900"
                    : "border-slate-200 focus:border-sky-500 focus:ring-sky-500/10 dark:border-slate-700"
                }`}
              />

              {errors.estimatedCost && (
                <p className="mt-1.5 text-xs font-medium text-red-500">
                  {errors.estimatedCost}
                </p>
              )}
            </div>

            {/* Notes */}
            <div className="sm:col-span-2">
              <label
                htmlFor="activity-notes"
                className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
              >
                Notes
              </label>

              <textarea
                id="activity-notes"
                name="notes"
                rows="4"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any useful notes..."
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:bg-slate-50 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-sky-500 dark:focus:bg-slate-950"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 p-6 sm:flex-row sm:justify-end dark:border-slate-800 dark:bg-slate-950/50">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-sky-50 px-5 text-sm font-semibold text-blue-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-100 hover:text-blue-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:ring-offset-2 dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20 dark:hover:text-sky-300 dark:focus:ring-offset-slate-900"
            >
              {initialData ? "Save Changes" : "Add Activity"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ActivityForm;
