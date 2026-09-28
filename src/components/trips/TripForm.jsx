import { useState } from "react";
import {
  CalendarDays,
  DollarSign,
  FileText,
  Image,
  MapPin,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Button from "../common/Button";
import { useTrips } from "../../context/TripContext";

const initialForm = {
  title: "",
  destination: "",
  country: "",
  startDate: "",
  endDate: "",
  travelers: 1,
  budget: "",
  coverImage: "",
  description: "",
};

function TripForm({
  initialValues = initialForm,
  submitLabel = "Create Trip",
  onSuccess,
}) {
  const navigate = useNavigate();
  const { createTrip } = useTrips();

  const [formData, setFormData] = useState({
    ...initialForm,
    ...initialValues,
  });

  const [errors, setErrors] = useState({});

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
      newErrors.title = "Trip name is required.";
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
      new Date(formData.endDate) < new Date(formData.startDate)
    ) {
      newErrors.endDate = "End date cannot be before the start date.";
    }

    if (Number(formData.travelers) < 1) {
      newErrors.travelers = "At least one traveler is required.";
    }

    if (Number(formData.budget) < 0) {
      newErrors.budget = "Budget cannot be a negative number.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newTrip = createTrip({
      ...formData,
      travelers: Number(formData.travelers),
      budget: Number(formData.budget) || 0,
    });

    if (onSuccess) {
      onSuccess(newTrip);
      return;
    }

    navigate(`/trips/${newTrip.id}`);
  };

  const inputClasses = (field) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 ${
      errors[field]
        ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
        : "border-slate-200 dark:border-slate-700"
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section>
        <div className="mb-5">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Trip information
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Tell us about your upcoming adventure.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              Trip name
            </label>

            <div className="relative">
              <FileText
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Summer in Northern Pakistan"
                className={`${inputClasses("title")} pl-11`}
              />
            </div>

            {errors.title && (
              <p className="mt-1.5 text-xs text-red-500">{errors.title}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="destination"
              className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              Destination
            </label>

            <div className="relative">
              <MapPin
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                placeholder="e.g. Hunza Valley"
                className={`${inputClasses("destination")} pl-11`}
              />
            </div>

            {errors.destination && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.destination}
              </p>
            )}
          </div>

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
              value={formData.country}
              onChange={handleChange}
              placeholder="e.g. Pakistan"
              className={inputClasses("country")}
            />
          </div>

          <div>
            <label
              htmlFor="startDate"
              className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              Start date
            </label>

            <div className="relative">
              <CalendarDays
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                className={`${inputClasses("startDate")} pl-11`}
              />
            </div>

            {errors.startDate && (
              <p className="mt-1.5 text-xs text-red-500">{errors.startDate}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="endDate"
              className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              End date
            </label>

            <div className="relative">
              <CalendarDays
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                className={`${inputClasses("endDate")} pl-11`}
              />
            </div>

            {errors.endDate && (
              <p className="mt-1.5 text-xs text-red-500">{errors.endDate}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="travelers"
              className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              Travelers
            </label>

            <div className="relative">
              <Users
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="travelers"
                name="travelers"
                type="number"
                min="1"
                value={formData.travelers}
                onChange={handleChange}
                className={`${inputClasses("travelers")} pl-11`}
              />
            </div>

            {errors.travelers && (
              <p className="mt-1.5 text-xs text-red-500">{errors.travelers}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="budget"
              className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              Trip budget
            </label>

            <div className="relative">
              <DollarSign
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="budget"
                name="budget"
                type="number"
                min="0"
                value={formData.budget}
                onChange={handleChange}
                placeholder="5000"
                className={`${inputClasses("budget")} pl-11`}
              />
            </div>

            {errors.budget && (
              <p className="mt-1.5 text-xs text-red-500">{errors.budget}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="coverImage"
              className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              Cover image URL
            </label>

            <div className="relative">
              <Image
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="coverImage"
                name="coverImage"
                type="url"
                value={formData.coverImage}
                onChange={handleChange}
                placeholder="https://example.com/travel-image.jpg"
                className={`${inputClasses("coverImage")} pl-11`}
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add a short description about your trip..."
              className={`${inputClasses("description")} resize-none`}
            />
          </div>
        </div>
      </section>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end dark:border-slate-800">
        <Button
          type="button"
          variant="secondary"
          onClick={() => navigate("/trips")}
        >
          Cancel
        </Button>

        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}

export default TripForm;
