import { useState, useEffect } from "react";
import { message } from "antd";
import { backendURL, urlBack } from "../constants/backendURL";

const useMedic = () => {
  const [pacienti, setPacienti] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const medicId = localStorage.getItem("medicId");

  const fetchPacienti = async () => {
    try {
      setLoading(true);
      const url = `${urlBack}/api/auth/pacienti?medicId=${medicId}`;
      console.log("Fetching pacients from URL:", url); // Adăugăm log pentru debug
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch pacients");
      }
      const data = await response.json();
      console.log("Fetched pacients data:", data); // Adăugăm log pentru debug
      setPacienti(data);
    } catch (err) {
      setError(err.message);
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addPacient = async (pacientData) => {
    try {
      setLoading(true);
      const url = `${urlBack}/api/auth/signup/pacient`;
      console.log("Adding pacient to URL:", url); // Adăugăm log pentru debug
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...pacientData, medic: medicId }),
      });
      if (!response.ok) {
        throw new Error("Failed to add pacient");
      }
      const data = await response.json();
      console.log("Added pacient data:", data); // Adăugăm log pentru debug
      setPacienti((prevPacienti) => [...prevPacienti, data.user]);
      message.success("Pacient adăugat cu succes!");
    } catch (err) {
      setError(err.message);
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPacienti();
  }, []);

  return {
    pacienti,
    addPacient,
    loading,
    error,
  };
};

export default useMedic;
