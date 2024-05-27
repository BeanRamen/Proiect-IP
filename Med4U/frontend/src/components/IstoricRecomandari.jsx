import React, { useState, useEffect } from "react";
import { backendURL } from "../constants/backendURL";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const IstoricRecomandari = ({ pacientId }) => {
  const [istoric, setIstoric] = useState({});
  const [open, setOpen] = useState({});

  useEffect(() => {
    const fetchIstoric = async () => {
      try {
        const response = await fetch(
          `http://${backendURL}:3000/api/auth/recomandari/${pacientId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const groupedByDate = data.reduce((acc, recomandare) => {
          const date = new Date(recomandare.createdAt).toLocaleDateString();
          if (!acc[date]) acc[date] = [];
          acc[date].push(recomandare);
          return acc;
        }, {});

        setIstoric(groupedByDate);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchIstoric();
  }, [pacientId]);

  const handleClick = (date) => {
    setOpen((prevOpen) => ({ ...prevOpen, [date]: !prevOpen[date] }));
  };

  return (
    <div>
      <Typography variant="h4" className="text-center text-[#147B72]">
        ISTORIC
      </Typography>
      <List>
        {Object.keys(istoric).map((date) => (
          <div key={date}>
            <ListItem button onClick={() => handleClick(date)}>
              <ListItemText primary={date} />
              {open[date] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open[date]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {istoric[date].map((recomandare) => (
                  <ListItem key={recomandare._id}>
                    <ListItemText primary={recomandare.text} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </div>
        ))}
      </List>
    </div>
  );
};

export default IstoricRecomandari;
