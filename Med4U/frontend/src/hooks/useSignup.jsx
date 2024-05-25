import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { message } from "antd";
import { backendURL } from "../constants/backendURL";

const useSignup = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const registerUser = async (values) => {
    if (values.user.password !== values.user.passwordConfirm) {
      return setError("Parolele nu coincid");
    }

    try {
      setError(null);
      setLoading(true);
      const res = await fetch(
        `http://${backendURL}:3000/api/auth/signup/pacient`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...values.user,
          }),
        }
      );

      const data = await res.json();
      if (res.status === 201) {
        message.success(data.message);
        login(data.token, data.user);
      } else if (res.status === 400) {
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

  return { loading, error, registerUser };
};

export default useSignup;
