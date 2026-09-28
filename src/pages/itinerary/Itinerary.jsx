import { useEffect, useState } from "react";
import { ArrowLeft, CalendarDays, MapPin } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

import ActivityForm from "../../components/itinerary/ActivityForm";
import ItineraryBoard from "../../components/itinerary/ItineraryBoard";
import DashboardLayout from "../../components/layout/DashboardLayout";

import { useItinerary } from "../../context/ItineraryContext";
import { useTrips } from "../../context/TripContext";

function Itinerary() {
  const [searchParams] = useSearchParams();

  const tripId = searchParams.get("trip");

  const { getTripById } = useTrips();

  const {
    getItinerary,
    createItinerary,
    addActivity,
    updateActivity,
    deleteActivity,
    moveActivity,
  } = useItinerary();

  const trip = getTripById(tripId);

  const [itinerary, setItinerary] = useState(null);

  const [activityModal, setActivityModal] = useState({
    isOpen: false,
    dayId: null,
    activity: null,
  });

  useEffect(() => {
    if (!tripId || !trip) {
      return;
    }

    const existingItinerary = getItinerary(tripId);

    if (existingItinerary) {
      setItinerary(existingItinerary);
      return;
    }

    const newItinerary = createItinerary(tripId, trip.startDate, trip.endDate);

    setItinerary(newItinerary);
  }, [tripId, trip, getItinerary, createItinerary]);

  useEffect(() => {
    if (!tripId) {
      return;
    }

    const interval = setInterval(() => {
      const currentItinerary = getItinerary(tripId);

      if (currentItinerary) {
        setItinerary(currentItinerary);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [tripId, getItinerary]);

  const openAddActivity = (dayId) => {
    setActivityModal({
      isOpen: true,
      dayId,
      activity: null,
    });
  };

  const openEditActivity = (dayId, activity) => {
    setActivityModal({
      isOpen: true,
      dayId,
      activity,
    });
  };

  const closeActivityModal = () => {
    setActivityModal({
      isOpen: false,
      dayId: null,
      activity: null,
    });
  };

  const handleActivitySubmit = (data) => {
    if (activityModal.activity && activityModal.dayId) {
      updateActivity(
        tripId,
        activityModal.dayId,
        activityModal.activity.id,
        data,
      );
    } else {
      addActivity(tripId, activityModal.dayId, data);
    }

    closeActivityModal();
  };

  const handleDeleteActivity = (dayId, activityId) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this activity?",
    );

    if (!shouldDelete) {
      return;
    }

    deleteActivity(tripId, dayId, activityId);
  };

  const handleMoveActivity = (
    activityId,
    sourceDayId,
    destinationDayId,
    destinationIndex,
  ) => {
    moveActivity(
      tripId,
      activityId,
      sourceDayId,
      destinationDayId,
      destinationIndex,
    );
  };

  if (!trip) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[60vh] items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Trip not found
            </h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              The trip you're looking for doesn't exist.
            </p>

            <Link
              to="/trips"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sky-50 px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-sky-100 hover:text-blue-800 dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20 dark:hover:text-sky-300"
            >
              <ArrowLeft size={16} />
              Back to My Trips
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!itinerary) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-sky-500" />

            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Preparing your itinerary...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-full bg-slate-50 dark:bg-slate-950">
        {/* Header */}
        <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <Link
              to={`/trips/${trip.id}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              <ArrowLeft size={16} />
              Back to Trip
            </Link>

            <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 dark:bg-sky-500/10 dark:text-sky-400">
                    <CalendarDays size={14} />
                    Itinerary
                  </span>
                </div>

                <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {trip.title}
                </h1>

                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={16} className="text-sky-500" />
                    {trip.destination}
                    {trip.country && `, ${trip.country}`}
                  </span>

                  <span>
                    {itinerary.days.length}{" "}
                    {itinerary.days.length === 1 ? "day" : "days"}
                  </span>

                  <span>
                    {itinerary.days.reduce(
                      (total, day) => total + day.activities.length,
                      0,
                    )}{" "}
                    activities
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Board */}
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {itinerary.days.length > 0 ? (
            <>
              <div className="mb-5 rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 dark:border-sky-500/10 dark:bg-sky-500/5">
                <p className="text-sm text-sky-700 dark:text-sky-300">
                  <span className="font-semibold">Tip:</span> Drag activities to
                  reorder them or move them to another day.
                </p>
              </div>

              <ItineraryBoard
                days={itinerary.days}
                onMoveActivity={handleMoveActivity}
                onAddActivity={openAddActivity}
                onEditActivity={openEditActivity}
                onDeleteActivity={handleDeleteActivity}
              />
            </>
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
              <CalendarDays
                size={40}
                className="mx-auto text-slate-300 dark:text-slate-600"
              />

              <h2 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                No itinerary days
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                Add start and end dates to your trip before planning your
                itinerary.
              </p>

              <Link
                to={`/trips/${trip.id}/edit`}
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-sky-50 px-5 py-3 text-sm font-semibold text-blue-700 transition-all hover:-translate-y-0.5 hover:bg-sky-100 hover:text-blue-800 hover:shadow-md dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20 dark:hover:text-sky-300"
              >
                Edit Trip Dates
              </Link>
            </div>
          )}
        </main>

        {/* Activity Modal */}
        <ActivityForm
          isOpen={activityModal.isOpen}
          onClose={closeActivityModal}
          onSubmit={handleActivitySubmit}
          initialData={activityModal.activity}
        />
      </div>
    </DashboardLayout>
  );
}

export default Itinerary;
