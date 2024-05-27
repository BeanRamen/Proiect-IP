import React, { useState, useEffect } from "react";
import { backendURL } from "../constants/backendURL";
import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
} from "@mui/material";
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
        setRecomandari(data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecomandari();
  }, [pacientId]);

  const handleAddRecomandare = async () => {
    if (!newRecomandare.trim()) {
      // Nu trimite request dacă input-ul este gol
      return;
    }
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
      setRecomandari([...recomandari, data]);
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
    <div>
      <Typography variant="h4" className="text-center text-[#147B72]">
        RECOMANDĂRI
      </Typography>
      {isMedic && (
        <div className="my-4">
          <TextField
            label="Adaugă recomandare"
            value={newRecomandare}
            onChange={(e) => setNewRecomandare(e.target.value)}
            fullWidth
          />
          <Button
            onClick={handleAddRecomandare}
            variant="contained"
            color="primary"
            className="mt-2"
            disabled={!newRecomandare.trim()}
          >
            Adaugă
          </Button>
        </div>
      )}
      <List>
        {recomandari.map((recomandare) => (
          <ListItem key={recomandare._id}>
            <ListItemText primary={recomandare.text} />
            {isMedic && (
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteRecomandare(recomandare._id)}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default RecomandariList;
