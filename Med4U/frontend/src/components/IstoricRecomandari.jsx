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
  const [istoric, setIstoric] = useState([]);
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
    <div className="bg-[#147B72] p-4 rounded-t-lg">
      <Typography variant="h4" className="text-center text-white mb-4">
        ISTORIC
      </Typography>
      <div className="bg-gray-100 p-4 rounded-b-lg max-h-96 overflow-y-auto">
        <List>
          {Object.keys(istoric).map((date) => (
            <div key={date} className="mb-4">
              <ListItem
                button
                onClick={() => handleClick(date)}
                className="bg-white rounded-lg shadow mb-2"
              >
                <ListItemText primary={date} className="text-[#147B72]" />
                {open[date] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open[date]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {istoric[date].map((recomandare) => (
                    <ListItem
                      key={recomandare._id}
                      className="bg-gray-100 rounded-lg shadow mb-2 pl-6"
                    >
                      <ListItemText
                        primary={recomandare.text}
                        className="text-gray-700"
                      />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </div>
          ))}
        </List>
      </div>
    </div>
  );
};

export default IstoricRecomandari;
