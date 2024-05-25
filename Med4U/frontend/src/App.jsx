import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminPage from "./pages/AdminPage";
import MedicPage from "./pages/MedicPage";
import PacientPage from "./pages/PacientPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/medic"
        element={
          <ProtectedRoute requiredRole="medic">
            <MedicPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pacient"
        element={
          <ProtectedRoute requiredRole="pacient">
            <PacientPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
