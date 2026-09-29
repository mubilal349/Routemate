import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNotifications } from "./NotificationContext";

const TripContext = createContext(null);

const TRIPS_STORAGE_KEY = "routemate-trips";

const createTripId = () => {
  return `trip-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
};

const createActivityId = () => {
  return `activity-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
};

const createExpenseId = () => {
  return `expense-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
};

const createHotelBookingId = () => {
  return `hotel-booking-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
};

const createTransportBookingId = () => {
  return `transport-booking-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
};

export function TripProvider({ children }) {
  const { addNotification } = useNotifications();

  const [trips, setTrips] = useState(() => {
    try {
      const storedTrips = localStorage.getItem(TRIPS_STORAGE_KEY);

      return storedTrips ? JSON.parse(storedTrips) : [];
    } catch (error) {
      console.error("Failed to load trips:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(trips));
  }, [trips]);

  /* =========================================================
     TRIPS
  ========================================================= */

  const createTrip = (tripData) => {
    const newTrip = {
      id: createTripId(),
      title: tripData.title || "Untitled Trip",
      destination: tripData.destination || "",
      country: tripData.country || "",
      startDate: tripData.startDate || "",
      endDate: tripData.endDate || "",
      travelers: Number(tripData.travelers) || 1,
      budget: Number(tripData.budget) || 0,
      coverImage: tripData.coverImage || "",
      description: tripData.description || "",
      status: "planned",
      isSaved: false,
      activities: [],
      hotels: [],
      transport: [],
      expenses: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTrips((currentTrips) => [newTrip, ...currentTrips]);

    // Notification
    addNotification({
      title: "Trip created",
      message: `${newTrip.title} has been added to your trips.`,
      type: "trip",
      link: `/trips/${newTrip.id}`,
    });

    return newTrip;
  };

  const updateTrip = (tripId, updates) => {
    setTrips((currentTrips) =>
      currentTrips.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : trip,
      ),
    );
  };

  const deleteTrip = (tripId) => {
    setTrips((currentTrips) =>
      currentTrips.filter((trip) => trip.id !== tripId),
    );
  };

  const getTripById = (tripId) => {
    return trips.find((trip) => trip.id === tripId) || null;
  };

  const toggleSavedTrip = (tripId) => {
    setTrips((currentTrips) =>
      currentTrips.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              isSaved: !trip.isSaved,
              updatedAt: new Date().toISOString(),
            }
          : trip,
      ),
    );
  };

  /* =========================================================
     ACTIVITIES
  ========================================================= */

  const addActivity = (tripId, activity) => {
    const activityId = createActivityId();
    const createdAt = new Date().toISOString();

    setTrips((currentTrips) =>
      currentTrips.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              activities: [
                ...(trip.activities || []),
                {
                  id: activityId,
                  ...activity,
                  createdAt,
                },
              ],
              updatedAt: createdAt,
            }
          : trip,
      ),
    );

    // Find the trip for the notification message
    const trip = trips.find((item) => item.id === tripId);

    addNotification({
      title: "Activity added",
      message: `${
        activity.title || activity.name || "A new activity"
      } was added to ${trip?.title || "your trip"}.`,
      type: "activity",
      link: `/trips/${tripId}`,
    });
  };

  const removeActivity = (tripId, activityId) => {
    setTrips((currentTrips) =>
      currentTrips.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              activities: (trip.activities || []).filter(
                (activity) => activity.id !== activityId,
              ),
              updatedAt: new Date().toISOString(),
            }
          : trip,
      ),
    );
  };

  /* =========================================================
     EXPENSES
  ========================================================= */

  const addExpense = (tripId, expense) => {
    const expenseId = createExpenseId();
    const createdAt = new Date().toISOString();

    setTrips((currentTrips) =>
      currentTrips.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              expenses: [
                ...(trip.expenses || []),
                {
                  id: expenseId,
                  ...expense,
                  createdAt,
                },
              ],
              updatedAt: createdAt,
            }
          : trip,
      ),
    );

    const trip = trips.find((item) => item.id === tripId);

    const expenseTitle = expense.title || expense.name || "Travel expense";

    const expenseAmount = Number(expense.amount || 0);

    // Notification
    addNotification({
      title: "Expense added",
      message: `${
        expenseTitle
      } ($${expenseAmount.toLocaleString()}) was added to ${
        trip?.title || "your trip"
      }.`,
      type: "expense",
      link: `/trips/${tripId}`,
    });
  };

  const removeExpense = (tripId, expenseId) => {
    setTrips((currentTrips) =>
      currentTrips.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              expenses: (trip.expenses || []).filter(
                (expense) => expense.id !== expenseId,
              ),
              updatedAt: new Date().toISOString(),
            }
          : trip,
      ),
    );
  };

  /* =========================================================
     HOTELS
  ========================================================= */

  const addHotelToTrip = (tripId, hotelBooking) => {
    const bookedAt = new Date().toISOString();

    const booking = {
      id: createHotelBookingId(),

      hotelId: hotelBooking.hotelId || "",

      hotelName: hotelBooking.hotelName || "Unnamed Hotel",

      location: hotelBooking.location || "",

      city: hotelBooking.city || "",

      country: hotelBooking.country || "",

      image: hotelBooking.image || "",

      rating: Number(hotelBooking.rating) || 0,

      pricePerNight: Number(hotelBooking.pricePerNight) || 0,

      currency: hotelBooking.currency || "USD",

      checkIn: hotelBooking.checkIn || "",

      checkOut: hotelBooking.checkOut || "",

      nights: Number(hotelBooking.nights) || 0,

      guests: Number(hotelBooking.guests) || 1,

      total: Number(hotelBooking.total) || 0,

      bookedAt,
    };

    setTrips((currentTrips) =>
      currentTrips.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              hotels: [...(trip.hotels || []), booking],
              updatedAt: bookedAt,
            }
          : trip,
      ),
    );

    const trip = trips.find((item) => item.id === tripId);

    // Hotel booking notification
    addNotification({
      title: "Hotel booked",
      message: `${booking.hotelName} has been added to ${
        trip?.title || "your trip"
      }.`,
      type: "hotel",
      link: `/trips/${tripId}`,
    });

    return booking;
  };

  const removeHotelFromTrip = (tripId, bookingId) => {
    setTrips((currentTrips) =>
      currentTrips.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              hotels: (trip.hotels || []).filter(
                (hotel) => hotel.id !== bookingId,
              ),
              updatedAt: new Date().toISOString(),
            }
          : trip,
      ),
    );
  };

  /* =========================================================
     TRANSPORT
  ========================================================= */

  const addTransportToTrip = (tripId, transportBooking) => {
    const bookedAt = new Date().toISOString();

    const booking = {
      id: createTransportBookingId(),

      transportId: transportBooking.transportId || "",

      type: transportBooking.type || "flight",

      provider: transportBooking.provider || "",

      name: transportBooking.name || "Unnamed Transport",

      from: transportBooking.from || "",

      to: transportBooking.to || "",

      departureDate: transportBooking.departureDate || "",

      departureTime: transportBooking.departureTime || "",

      arrivalTime: transportBooking.arrivalTime || "",

      duration: transportBooking.duration || "",

      price: Number(transportBooking.price) || 0,

      currency: transportBooking.currency || "USD",

      passengers: Number(transportBooking.passengers) || 1,

      total: Number(transportBooking.total) || 0,

      image: transportBooking.image || "",

      bookedAt,
    };

    setTrips((currentTrips) =>
      currentTrips.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              transport: [...(trip.transport || []), booking],
              updatedAt: bookedAt,
            }
          : trip,
      ),
    );

    const trip = trips.find((item) => item.id === tripId);

    // Transport notification
    addNotification({
      title: "Transport added",
      message: `${booking.name} has been added to ${
        trip?.title || "your trip"
      }.`,
      type: "transport",
      link: `/trips/${tripId}`,
    });

    return booking;
  };

  const removeTransportFromTrip = (tripId, bookingId) => {
    setTrips((currentTrips) =>
      currentTrips.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              transport: (trip.transport || []).filter(
                (item) => item.id !== bookingId,
              ),
              updatedAt: new Date().toISOString(),
            }
          : trip,
      ),
    );
  };

  /* =========================================================
     DERIVED DATA
  ========================================================= */

  const savedTrips = useMemo(
    () => trips.filter((trip) => trip.isSaved),
    [trips],
  );

  const totalBudget = useMemo(
    () => trips.reduce((total, trip) => total + Number(trip.budget || 0), 0),
    [trips],
  );

  /* =========================================================
     CONTEXT VALUE
  ========================================================= */

  const value = {
    trips,
    savedTrips,
    totalBudget,

    createTrip,
    updateTrip,
    deleteTrip,
    getTripById,
    toggleSavedTrip,

    addActivity,
    removeActivity,

    addExpense,
    removeExpense,

    addHotelToTrip,
    removeHotelFromTrip,

    addTransportToTrip,
    removeTransportFromTrip,
  };

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}

export function useTrips() {
  const context = useContext(TripContext);

  if (!context) {
    throw new Error("useTrips must be used inside TripProvider");
  }

  return context;
}
