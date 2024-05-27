import React from "react";
import { Typography, Button } from "@mui/material";

const StatusText = () => {
  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <div className="text-center">
        <Typography className="text-green-600 font-bold">
          Felicitări!
        </Typography>
        <Typography>Pulsul este bun</Typography>
      </div>
      <div className="text-center">
        <Typography className="text-yellow-600 font-bold">
          Aveți grijă!
        </Typography>
        <Typography>
          Temperatura corpului este destul de mare{" "}
          <a href="#recomandari" className="text-blue-600">
            vezi recomandări
          </a>
        </Typography>
      </div>
      <div className="text-center">
        <Typography className="text-red-600 font-bold">Atenție!</Typography>
        <Typography>
          ECG-ul nu arată bine{" "}
          <a href="#recomandari" className="text-blue-600">
            vezi recomandări
          </a>
        </Typography>
      </div>
      <Button variant="contained" color="primary">
        Vezi recomandările medicului
      </Button>
    </div>
  );
};

export default StatusText;
