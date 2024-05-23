import { Button } from "antd";
import React from "react";
import { useAuth } from "../contexts/AuthContext";

const Pacient = () => {
  const { logout } = useAuth();
  return (
    <>
      <div>Pacient page</div>
      <Button onClick={logout}>Logout</Button>
    </>
  );
};

export default Pacient;
