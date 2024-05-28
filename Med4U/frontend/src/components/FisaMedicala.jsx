import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { backendURL } from "../constants/backendURL";
import { TextField, Typography, Button } from "@mui/material";

const FisaMedicala = () => {
  const { pacientId } = useParams();
  const { user } = useAuth();
  const [pacient, setPacient] = useState(null);

  useEffect(() => {
    const fetchPacientDetails = async () => {
      try {
        const response = await fetch(
          `http://${backendURL}:3000/api/auth/pacienti/${pacientId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPacient(data.pacient);
      } catch (error) {
        console.error("Error fetching pacient details:", error);
      }
    };

    fetchPacientDetails();
  }, [pacientId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPacient((prevPacient) => ({
      ...prevPacient,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://${backendURL}:3000/api/auth/pacienti/${pacientId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pacient),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      alert("Fisa medicala a fost actualizata cu succes!");
    } catch (error) {
      console.error("Error updating pacient details:", error);
    }
  };

  if (!pacient) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-8 w-4/5 mx-auto bg-white rounded-lg shadow-md mt-8">
      <Typography variant="h5" className="text-center mb-8">
        FIȘA MEDICALĂ
      </Typography>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField
          label="Nume"
          name="nume"
          value={pacient.nume || ""}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="CNP"
          name="cnp"
          value={pacient.cnp || ""}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Vârstă"
          name="varsta"
          value={pacient.varsta || ""}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Număr Telefon"
          name="numar_telefon"
          value={pacient.numar_telefon || ""}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Email"
          name="email"
          value={pacient.email || ""}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Adresă"
          name="adresa"
          value={pacient.adresa || ""}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Loc de Muncă"
          name="loc_munca"
          value={pacient.loc_munca || ""}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Specificații"
          name="specificatii"
          value={pacient.specificatii || ""}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={4}
        />
      </form>
      {user.role === "medic" && (
        <div className="text-center mt-8">
          <Button variant="contained" color="primary" onClick={handleSave}>
            Salvează
          </Button>
        </div>
      )}
    </div>
  );
};

export default FisaMedicala;
