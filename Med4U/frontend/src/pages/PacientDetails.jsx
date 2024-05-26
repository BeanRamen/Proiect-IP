import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { backendURL } from "../constants/backendURL";

const PacientDetails = () => {
  const { pacientId } = useParams();
  const [pacient, setPacient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Received pacientId:", pacientId);
    const fetchPacient = async () => {
      try {
        const response = await fetch(
          `http://${backendURL}:3000/api/auth/pacienti/${pacientId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch pacient");
        }
        const data = await response.json();
        setPacient(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPacient();
  }, [pacientId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">{pacient.nume}</h1>
      <p>CNP: {pacient.cnp}</p>
      <p>Vârstă: {pacient.varsta}</p>
      <p>Număr telefon: {pacient.numar_telefon}</p>
      <p>Email: {pacient.email}</p>
      <p>Adresă: {pacient.adresa}</p>
      <p>Loc de muncă: {pacient.loc_munca}</p>
      <p>Specificații: {pacient.specificatii}</p>
    </div>
  );
};

export default PacientDetails;
