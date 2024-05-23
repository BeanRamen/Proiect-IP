import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { HomePage } from "./Layout/HomePage";
import ForgotPassword from "./Layout/ForgotPassword";
import Register from "./Auth/Register";
import Login from "./Auth/Login";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />

          {/* <Route path="/pacient" element={<Pacient />} />
            <Route path="/medic" element={<Medic />} /> */}

          {/* Adaugă alte rute aici, dacă este necesar */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
