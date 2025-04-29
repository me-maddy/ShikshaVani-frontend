import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./components/common/Toast";
import ProtectedRoute from "./routes/ProtectedRoute";

// User Pages
import Home from "./pages/Home";
import Register from "./pages/user/Register";
import Login from "./pages/user/Login";
import SelectFacultyClass from "./pages/user/SelectFacultyClass";
import Main from "./pages/user/Main";

// Faculty Pages
import FacultyRegister from "./pages/faculty/Register";
import FacultyLogin from "./pages/faculty/Login";
import Dashboard from "./pages/faculty/Dashboard";
import FacultyProfileSetup from "./components/faculty/FacultyProfileSetup";

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />

            {/* User Routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/select-faculty-class"
              element={
                <ProtectedRoute userType="user">
                  <SelectFacultyClass />
                </ProtectedRoute>
              }
            />
            <Route
              path="/main"
              element={
                <ProtectedRoute userType="user" requireFullRegistration>
                  <Main />
                </ProtectedRoute>
              }
            />

            {/* Faculty Routes */}
            <Route path="/faculty/register" element={<FacultyRegister />} />
            <Route path="/faculty/login" element={<FacultyLogin />} />
            <Route
              path="/faculty/profile-setup"
              element={<FacultyProfileSetup />}
            />
            <Route
              path="/faculty/dashboard/*"
              element={
                <ProtectedRoute userType="faculty">
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Catch-all / 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
