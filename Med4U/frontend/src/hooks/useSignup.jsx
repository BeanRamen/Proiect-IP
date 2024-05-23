import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { message } from "antd";

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
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            nume: values.user.nume,
            cnp: values.user.cnp,
            varsta: values.user.varsta,
            numar_telefon: values.user.numar_telefon,
            email: values.user.email,
            adresa: values.user.adresa,
            loc_munca: values.user.loc_munca,
            specificatii: values.user.descriere,
            password: values.user.password,
          },
        }),
      });

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