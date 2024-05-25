import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { backendURL } from "../constants/backendURL";
import { useAuth } from "../contexts/AuthContext";

const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loginUser = async (values) => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch(`http://${backendURL}:3000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed!");
      }

      login(data.user); // Utilizează funcția de login din AuthContext
    } catch (error) {
      setError(error.message);
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, loginUser };
};

export default useLogin;
