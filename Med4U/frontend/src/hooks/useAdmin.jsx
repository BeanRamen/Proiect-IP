import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { message } from "antd";
import { backendURL } from "../constants/backendURL";

const useAdmin = () => {
  const { user } = useAuth();
  const [medici, setMedici] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMedici = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://${backendURL}:3000/api/auth/medici`);
      const data = await res.json();
      if (res.ok) {
        setMedici(data);
      } else {
        throw new Error(data.message || "Failed to fetch medici");
      }
    } catch (error) {
      setError(error.message);
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addMedic = async (medicData) => {
    try {
      setError(null);
      setLoading(true);
      const res = await fetch(
        `http://${backendURL}:3000/api/auth/signup/medic`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(medicData),
        }
      );

      const data = await res.json();
      if (res.ok) {
        message.success(data.message);
        fetchMedici(); // Refresh medici list
      } else {
        throw new Error(data.message || "Failed to add medic");
      }
    } catch (error) {
      setError(error.message);
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteMedic = async (medicId) => {
    try {
      setError(null);
      setLoading(true);
      const res = await fetch(
        `http://${backendURL}:3000/api/auth/delete/medic/${medicId}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();
      if (res.ok) {
        message.success(data.message);
        fetchMedici(); // Refresh medici list
      } else {
        throw new Error(data.message || "Failed to delete medic");
      }
    } catch (error) {
      setError(error.message);
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedici();
  }, []);

  return { medici, loading, error, addMedic, deleteMedic, fetchMedici };
};

export default useAdmin;
