import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ItineraryContext = createContext(null);

const ITINERARY_STORAGE_KEY = "routemate-itineraries";

const createActivityId = () => {
  return `activity-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
};

const createDayId = () => {
  return `day-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
};

export function ItineraryProvider({ children }) {
  const [itineraries, setItineraries] = useState(() => {
    try {
      const storedItineraries = localStorage.getItem(ITINERARY_STORAGE_KEY);

      return storedItineraries ? JSON.parse(storedItineraries) : {};
    } catch (error) {
      console.error("Failed to load itineraries:", error);

      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(ITINERARY_STORAGE_KEY, JSON.stringify(itineraries));
  }, [itineraries]);

  const getItinerary = (tripId) => {
    return itineraries[tripId] || null;
  };

  const createItinerary = (tripId, startDate, endDate) => {
    const existingItinerary = itineraries[tripId];

    if (existingItinerary) {
      return existingItinerary;
    }

    const days = [];

    if (startDate && endDate) {
      const start = new Date(`${startDate}T00:00:00`);
      const end = new Date(`${endDate}T00:00:00`);

      let currentDate = new Date(start);

      while (currentDate <= end) {
        const date = currentDate.toISOString().split("T")[0];

        days.push({
          id: createDayId(),
          date,
          title: `Day ${days.length + 1}`,
          activities: [],
        });

        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    const newItinerary = {
      tripId,
      days,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setItineraries((current) => ({
      ...current,
      [tripId]: newItinerary,
    }));

    return newItinerary;
  };

  const addActivity = (tripId, dayId, activity) => {
    const newActivity = {
      id: createActivityId(),
      title: activity.title || "Untitled Activity",
      category: activity.category || "Activity",
      location: activity.location || "",
      startTime: activity.startTime || "",
      endTime: activity.endTime || "",
      notes: activity.notes || "",
      estimatedCost: Number(activity.estimatedCost) || 0,
      createdAt: new Date().toISOString(),
    };

    setItineraries((current) => {
      const itinerary = current[tripId];

      if (!itinerary) {
        return current;
      }

      return {
        ...current,
        [tripId]: {
          ...itinerary,
          days: itinerary.days.map((day) =>
            day.id === dayId
              ? {
                  ...day,
                  activities: [...day.activities, newActivity],
                }
              : day,
          ),
          updatedAt: new Date().toISOString(),
        },
      };
    });

    return newActivity;
  };

  const updateActivity = (tripId, dayId, activityId, updates) => {
    setItineraries((current) => {
      const itinerary = current[tripId];

      if (!itinerary) {
        return current;
      }

      return {
        ...current,
        [tripId]: {
          ...itinerary,
          days: itinerary.days.map((day) =>
            day.id === dayId
              ? {
                  ...day,
                  activities: day.activities.map((activity) =>
                    activity.id === activityId
                      ? {
                          ...activity,
                          ...updates,
                        }
                      : activity,
                  ),
                }
              : day,
          ),
          updatedAt: new Date().toISOString(),
        },
      };
    });
  };

  const deleteActivity = (tripId, dayId, activityId) => {
    setItineraries((current) => {
      const itinerary = current[tripId];

      if (!itinerary) {
        return current;
      }

      return {
        ...current,
        [tripId]: {
          ...itinerary,
          days: itinerary.days.map((day) =>
            day.id === dayId
              ? {
                  ...day,
                  activities: day.activities.filter(
                    (activity) => activity.id !== activityId,
                  ),
                }
              : day,
          ),
          updatedAt: new Date().toISOString(),
        },
      };
    });
  };

  const moveActivity = (
    tripId,
    activityId,
    sourceDayId,
    destinationDayId,
    destinationIndex,
  ) => {
    setItineraries((current) => {
      const itinerary = current[tripId];

      if (!itinerary) {
        return current;
      }

      const days = itinerary.days.map((day) => ({
        ...day,
        activities: [...day.activities],
      }));

      const sourceDay = days.find((day) => day.id === sourceDayId);

      const destinationDay = days.find((day) => day.id === destinationDayId);

      if (!sourceDay || !destinationDay) {
        return current;
      }

      const activityIndex = sourceDay.activities.findIndex(
        (activity) => activity.id === activityId,
      );

      if (activityIndex === -1) {
        return current;
      }

      const [activity] = sourceDay.activities.splice(activityIndex, 1);

      const safeIndex = Math.max(
        0,
        Math.min(destinationIndex, destinationDay.activities.length),
      );

      destinationDay.activities.splice(safeIndex, 0, activity);

      return {
        ...current,
        [tripId]: {
          ...itinerary,
          days,
          updatedAt: new Date().toISOString(),
        },
      };
    });
  };

  const totalActivities = useMemo(() => {
    return Object.values(itineraries).reduce((total, itinerary) => {
      return (
        total +
        itinerary.days.reduce(
          (dayTotal, day) => dayTotal + day.activities.length,
          0,
        )
      );
    }, 0);
  }, [itineraries]);

  const value = {
    itineraries,
    getItinerary,
    createItinerary,
    addActivity,
    updateActivity,
    deleteActivity,
    moveActivity,
    totalActivities,
  };

  return (
    <ItineraryContext.Provider value={value}>
      {children}
    </ItineraryContext.Provider>
  );
}

export function useItinerary() {
  const context = useContext(ItineraryContext);

  if (!context) {
    throw new Error("useItinerary must be used inside ItineraryProvider");
  }

  return context;
}
