import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";
import CategoriesWithChart from "./components/CategoriesWithChart";
import RegisterForm from "./components/RegisterForm";
import Login from "./components/Login";

function App() {
  const isAuthenticated = () => {
    // Check if the token exists in localStorage (you can also verify expiration, etc.)
    return !!localStorage.getItem("authToken");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/oldLogin" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/dashboard"
          element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <CategoriesWithChart />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
