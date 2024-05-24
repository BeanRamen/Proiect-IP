import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { message } from "antd";
import { backendURL } from "../constants/backendURL.js";

const useLogin = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loginUser = async (values) => {
    try {
      setError(null);
      setLoading(true);
      const res = await fetch(`http://${backendURL}:3000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cnp: values.cnp,
          password: values.password,
        }),
      });

      const data = await res.json();
      console.log("Response data:", data);
      if (res.status === 200) {
        message.success(data.message);
        login(data.token, data.user);
      } else if (res.status === 404) {
        setError(data.message);
      } else {
        setError(data.message || "Registration failed");
        message.error(data.message || "Registration failed");
      }
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
