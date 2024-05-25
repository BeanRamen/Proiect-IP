import React from "react";
import { useAuth } from "../contexts/AuthContext";

const PacientPage = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Pacient Page</h1>
      <button onClick={logout}>Logout</button>
      {/* Add pacient functionalities here */}
    </div>
  );
};

export default PacientPage;
