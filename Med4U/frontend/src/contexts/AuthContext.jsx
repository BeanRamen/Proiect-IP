import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    if (user) {
      redirectUser(user);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const redirectUser = (user) => {
    if (user.role === "admin") {
      navigate("/admin");
    } else if (user.role === "medic") {
      navigate("/medic");
    } else if (user.role === "pacient") {
      navigate(`/pacient/${user._id}`);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUser(user);
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        logout();
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      redirectUser(user);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
