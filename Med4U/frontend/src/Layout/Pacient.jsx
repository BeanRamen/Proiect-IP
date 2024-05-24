import { Button } from "antd";
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Pacient = () => {
  const { UserData, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const navigate = useNavigate();
  return (
    <>
      <div>Pacient page</div>
      <Button onClick={logout}>Logout</Button>
      <button
        className="px-4 py-2 bg-transparent text-[#147B72] rounded-full shadow-md hover:bg-[#147B72] hover:text-white w-64"
        onClick={() => navigate("/register")}
      >
        Cont nou
      </button>
    </>
  );
};

export default Pacient;
