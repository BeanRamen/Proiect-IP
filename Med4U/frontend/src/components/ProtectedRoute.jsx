import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  console.log("ProtectedRoute: user =", user);
  console.log("ProtectedRoute: requiredRole =", requiredRole);

  return children;
};

export default ProtectedRoute;
