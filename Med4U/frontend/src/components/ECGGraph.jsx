import React from "react";
import { Typography } from "@mui/material";

const ECGGraph = () => {
  return (
    <div className="bg-white p-4 rounded shadow-lg">
      <div className="h-64 bg-gray-200 flex justify-center items-center">
        {/* Graficul ECG va fi implementat aici */}
        <Typography className="text-[#147B72]">ECG Graph</Typography>
      </div>
    </div>
  );
};

export default ECGGraph;
