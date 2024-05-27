import React, { useState, useEffect } from "react";
import { backendURL } from "../constants/backendURL";
import { Typography, IconButton } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

const RecomandariList = ({ pacientId, isMedic }) => {
  const [recomandari, setRecomandari] = useState([]);
  const [newRecomandare, setNewRecomandare] = useState("");

  useEffect(() => {
    const fetchRecomandari = async () => {
      try {
        const response = await fetch(
          `http://${backendURL}:3000/api/auth/recomandari/${pacientId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRecomandari(data.reverse());
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecomandari();
  }, [pacientId]);

  const handleAddRecomandare = async () => {
    try {
      const response = await fetch(
        `http://${backendURL}:3000/api/auth/recomandari/${pacientId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: newRecomandare }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRecomandari([data, ...recomandari]);
      setNewRecomandare("");
    } catch (error) {
      console.error("Error adding recommendation:", error);
    }
  };

  const handleDeleteRecomandare = async (id) => {
    try {
      const response = await fetch(
        `http://${backendURL}:3000/api/auth/recomandari/${pacientId}/${id}`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setRecomandari(
        recomandari.filter((recomandare) => recomandare._id !== id)
      );
    } catch (error) {
      console.error("Error deleting recommendation:", error);
    }
  };

  return (
    <div className="bg-[#147B72] p-4 rounded-t-lg">
      <Typography variant="h4" className="text-center text-white mb-4">
        RECOMANDĂRI
      </Typography>
      <div className="bg-gray-100 p-4 rounded-b-lg">
        {isMedic && (
          <div className="mb-4">
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows="3"
              placeholder="Adaugă recomandare"
              value={newRecomandare}
              onChange={(e) => setNewRecomandare(e.target.value)}
            />
            <button
              onClick={handleAddRecomandare}
              className="mt-2 px-4 py-2 bg-[#147B72] text-white rounded-lg shadow hover:bg-gray-200"
              disabled={!newRecomandare.trim()}
            >
              Adaugă
            </button>
          </div>
        )}
        <div className="space-y-4">
          {recomandari.map((recomandare, index) => (
            <div
              key={recomandare._id}
              className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <Typography
                  variant="subtitle1"
                  className="text-[#147B72] font-bold"
                >
                  {index === 0
                    ? "Ultima recomandare"
                    : index === 1
                    ? "Penultima recomandare"
                    : `Recomandare ${index + 1}`}
                </Typography>
                <Typography variant="body1" className="text-gray-700">
                  {recomandare.text}
                </Typography>
              </div>
              {isMedic && (
                <IconButton
                  onClick={() => handleDeleteRecomandare(recomandare._id)}
                  className="text-red-500"
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecomandariList;
