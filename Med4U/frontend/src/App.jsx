import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { HomePage } from "./Layout/HomePage";
import ForgotPassword from "./Layout/ForgotPassword";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import { useAuth } from "./contexts/AuthContext";
import Pacient from "./Layout/Pacient";

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={
              !isAuthenticated ? <Register /> : <Navigate to="/pacient" />
            }
          />
          <Route
            path="/login"
            element={!isAuthenticated ? <Login /> : <Navigate to="/pacient" />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/pacient"
            element={isAuthenticated ? <Pacient /> : <Login />}
          />

          {/* <Route path="/pacient" element={<Pacient />} />
            <Route path="/medic" element={<Medic />} /> */}

          {/* Adaugă alte rute aici, dacă este necesar */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
