import { ArrowLeft, Pencil, Save } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Button from "../../components/common/Button";
import { useTrips } from "../../context/TripContext";

function EditTrip() {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const { getTripById, updateTrip } = useTrips();

  const trip = getTripById(tripId);

  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    country: "",
    startDate: "",
    endDate: "",
    travelers: 1,
    budget: "",
    coverImage: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!trip) {
      return;
    }

    setFormData({
      title: trip.title || "",
      destination: trip.destination || "",
      country: trip.country || "",
      startDate: trip.startDate || "",
      endDate: trip.endDate || "",
      travelers: trip.travelers || 1,
      budget: trip.budget || "",
      coverImage: trip.coverImage || "",
      description: trip.description || "",
    });
  }, [trip]);

  if (!trip) {
    return (
      <DashboardLayout>
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            <Pencil size={28} />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
            Trip not found
          </h1>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
            This trip may have been deleted or the link may no longer be valid.
          </p>

          <Link
            to="/trips"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sky-50 px-5 py-3 text-sm font-semibold text-blue-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-100 hover:text-blue-800 dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20 dark:hover:text-sky-300"
          >
            <ArrowLeft size={16} />
            Back to My Trips
          </Link>
        </div>
      </DashboardLayout>
    );
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Trip title is required.";
    }

    if (!formData.destination.trim()) {
      newErrors.destination = "Destination is required.";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required.";
    }

    if (!formData.endDate) {
      newErrors.endDate = "End date is required.";
    }

    if (
      formData.startDate &&
      formData.endDate &&
      formData.endDate < formData.startDate
    ) {
      newErrors.endDate = "End date cannot be before start date.";
    }

    if (Number(formData.travelers) < 1) {
      newErrors.travelers = "At least one traveler is required.";
    }

    if (Number(formData.budget) < 0) {
      newErrors.budget = "Budget cannot be negative.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSaving(true);

    updateTrip(trip.id, {
      title: formData.title.trim(),
      destination: formData.destination.trim(),
      country: formData.country.trim(),
      startDate: formData.startDate,
      endDate: formData.endDate,
      travelers: Number(formData.travelers),
      budget: Number(formData.budget) || 0,
      coverImage: formData.coverImage.trim(),
      description: formData.description.trim(),
    });

    setTimeout(() => {
      navigate(`/trips/${trip.id}`);
    }, 300);
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* Back */}
        <div className="mb-6">
          <Link
            to={`/trips/${trip.id}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Trip
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 dark:bg-sky-500/10 dark:text-sky-400">
            <Pencil size={14} />
            Edit trip
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Edit your trip
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Update your destination, dates, travelers, budget, and trip details.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Trip information
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Keep your trip details up to date.
              </p>
            </div>

            <div className="grid gap-6 p-6 sm:grid-cols-2">
              {/* Title */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Trip title
                </label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Hunza Adventure"
                  className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-950 ${
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

              {/* Destination */}
              <div>
                <label
                  htmlFor="destination"
                  className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Destination
                </label>

                <input
                  id="destination"
                  name="destination"
                  type="text"
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="e.g. Hunza Valley"
                  className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-950 ${
                    errors.destination
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/10 dark:border-red-900"
                      : "border-slate-200 focus:border-sky-500 focus:ring-sky-500/10 dark:border-slate-700"
                  }`}
                />

                {errors.destination && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.destination}
                  </p>
                )}
              </div>

              {/* Country */}
              <div>
                <label
                  htmlFor="country"
                  className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Country
                </label>

                <input
                  id="country"
                  name="country"
                  type="text"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="e.g. Pakistan"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-950"
                />
              </div>

              {/* Start Date */}
              <div>
                <label
                  htmlFor="startDate"
                  className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Start date
                </label>

                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:bg-white focus:ring-4 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-950 ${
                    errors.startDate
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/10 dark:border-red-900"
                      : "border-slate-200 focus:border-sky-500 focus:ring-sky-500/10 dark:border-slate-700"
                  }`}
                />

                {errors.startDate && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.startDate}
                  </p>
                )}
              </div>

              {/* End Date */}
              <div>
                <label
                  htmlFor="endDate"
                  className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  End date
                </label>

                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:bg-white focus:ring-4 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-950 ${
                    errors.endDate
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/10 dark:border-red-900"
                      : "border-slate-200 focus:border-sky-500 focus:ring-sky-500/10 dark:border-slate-700"
                  }`}
                />

                {errors.endDate && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.endDate}
                  </p>
                )}
              </div>

              {/* Travelers */}
              <div>
                <label
                  htmlFor="travelers"
                  className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Travelers
                </label>

                <input
                  id="travelers"
                  name="travelers"
                  type="number"
                  min="1"
                  value={formData.travelers}
                  onChange={handleChange}
                  className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:bg-white focus:ring-4 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-950 ${
                    errors.travelers
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/10 dark:border-red-900"
                      : "border-slate-200 focus:border-sky-500 focus:ring-sky-500/10 dark:border-slate-700"
                  }`}
                />

                {errors.travelers && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.travelers}
                  </p>
                )}
              </div>

              {/* Budget */}
              <div>
                <label
                  htmlFor="budget"
                  className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Budget (USD)
                </label>

                <input
                  id="budget"
                  name="budget"
                  type="number"
                  min="0"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="2500"
                  className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-950 ${
                    errors.budget
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/10 dark:border-red-900"
                      : "border-slate-200 focus:border-sky-500 focus:ring-sky-500/10 dark:border-slate-700"
                  }`}
                />

                {errors.budget && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.budget}
                  </p>
                )}
              </div>

              {/* Cover Image */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="coverImage"
                  className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Cover image URL
                </label>

                <input
                  id="coverImage"
                  name="coverImage"
                  type="url"
                  value={formData.coverImage}
                  onChange={handleChange}
                  placeholder="https://example.com/travel-image.jpg"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-950"
                />

                <p className="mt-1.5 text-xs text-slate-400">
                  Use a public image URL for the trip cover.
                </p>
              </div>

              {/* Description */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  rows="5"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell us about this trip..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-950"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 p-6 sm:flex-row sm:justify-end dark:border-slate-800 dark:bg-slate-950/50">
              <Link
                to={`/trips/${trip.id}`}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Cancel
              </Link>

              <Button
                type="submit"
                disabled={isSaving}
                className="h-11 gap-2 bg-sky-50 px-5 text-blue-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-100 hover:text-black-800 hover:shadow-md dark:bg-black-500/10 dark:text-black-400 dark:hover:bg-black-500/20 dark:hover:text-black-300"
              >
                <Save size={17} />

                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default EditTrip;
