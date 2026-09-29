import AppRoutes from "./routes/AppRoutes";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { TripProvider } from "./context/TripContext";
import { ItineraryProvider } from "./context/ItineraryContext";
import { NotificationProvider } from "./context/NotificationContext";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <TripProvider>
            <ItineraryProvider>
              <AppRoutes />
            </ItineraryProvider>
          </TripProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
