import { Routes, Route } from "react-router";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import ProtectedRoute from "./components/ProtectedRoute";
import SneakersPage from "./pages/SneakersPage";
import PerfumesPage from "./pages/PerfumesPage";

// Placeholder for now — we'll build this properly soon
const Dashboard = () => <h1>Dashboard (coming soon)</h1>;

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/onboarding"
        element={
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sneakers"
        element={
          <ProtectedRoute>
            <SneakersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/perfumes"
        element={
          <ProtectedRoute>
            <PerfumesPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
