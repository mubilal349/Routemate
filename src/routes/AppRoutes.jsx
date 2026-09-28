import { Navigate, Route, Routes } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/Dashboard";

import Trips from "../pages/trips/Trips";
import CreateTrip from "../pages/trips/CreateTrip";
import TripDetails from "../pages/trips/TripDetails";
import SavedTrips from "../pages/trips/SavedTrips";
import EditTrip from "../pages/trips/EditTrip";

import Itinerary from "../pages/itinerary/Itinerary";

import Transport from "../pages/transport/Transport";

import Budget from "../pages/budget/Budget";

import Map from "../pages/map/Map";

import ProtectedRoute from "../components/auth/ProtectedRoute";
import Hotels from "../pages/hotels/Hotels";

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/trips" element={<Trips />} />

        <Route path="/trips/create" element={<CreateTrip />} />

        <Route path="/trips/:tripId/edit" element={<EditTrip />} />

        <Route path="/trips/:tripId" element={<TripDetails />} />

        <Route path="/saved-trips" element={<SavedTrips />} />

        <Route path="/itinerary" element={<Itinerary />} />

        <Route path="/hotels" element={<Hotels />} />

        <Route path="/transport" element={<Transport />} />

        <Route path="/budget" element={<Budget />} />

        <Route path="/map" element={<Map />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
