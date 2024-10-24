import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PacientPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role === "pacient") {
      navigate(`/pacient/${user._id}`);
    }
  }, [user, navigate]);

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
};

export default PacientPage;
