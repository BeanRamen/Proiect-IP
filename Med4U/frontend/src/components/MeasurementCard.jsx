import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import tmpChrtIcon from "../assets/tmpChrt.svg"; // Make sure to import the correct path
import humIcon from "../assets/hum.svg"; // Make sure to import the correct path

const MeasurementCard = ({
  imageSrc,
  title,
  value,
  unit,
  status,
  extraValue,
}) => {
  return (
    <Card
      className="bg-white p-4  rounded-3xl shadow-lg"
      sx={{ borderRadius: "24px" }}
    >
      <CardContent className="flex flex-col items-center">
        <div className="flex items-center justify-start w-full mb-4">
          <img src={imageSrc} alt={title} className="w-12 mr-2" />
          <Typography
            variant="h6"
            className="text-black text-left leading-tight"
          >
            {title.split(" ").map((word, index) => (
              <div key={index}>{word}</div>
            ))}
          </Typography>
        </div>
        <Typography variant="h4" className="font-bold mb-2">
          {value} {unit}
        </Typography>
        <Typography className={`text-${status.color}-600 mb-4`}>
          {status.text}
        </Typography>
        {extraValue && (
          <div className="flex items-center mb-2">
            <img src={humIcon} alt="Humidity" className="w-6 mr-2" />
            <Typography variant="h6" className="font-bold text-gray-700">
              {extraValue.value} {extraValue.unit}
            </Typography>
          </div>
        )}
        <img src={tmpChrtIcon} alt="Chart" className="w-3/4 mt-4" />
      </CardContent>
    </Card>
  );
};

export default MeasurementCard;
