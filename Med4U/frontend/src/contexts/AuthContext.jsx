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
    redirectUser(user.role);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const redirectUser = (role) => {
    if (role === "admin") {
      navigate("/admin");
    } else if (role === "medic") {
      navigate("/medic");
    } else if (role === "pacient") {
      navigate("/pacient");
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUser(user);
        redirectUser(user.role);
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        logout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
