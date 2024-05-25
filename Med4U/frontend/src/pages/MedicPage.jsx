import React from "react";
import { useAuth } from "../contexts/AuthContext";

const MedicPage = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Medic Page</h1>
      <button onClick={logout}>Logout</button>
      {/* Add medic functionalities here */}
    </div>
  );
};

export default MedicPage;
