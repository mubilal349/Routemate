import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { TripProvider } from "./context/TripContext";
import { ItineraryProvider } from "./context/ItineraryContext";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TripProvider>
          <ItineraryProvider>
            <AppRoutes />
          </ItineraryProvider>
        </TripProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
