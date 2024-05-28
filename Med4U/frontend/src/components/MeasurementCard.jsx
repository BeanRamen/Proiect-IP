import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import tmpChrt from "../assets/tmpChrt.svg";

const MeasurementCard = ({
  imageSrc,
  title,
  value,
  unit,
  status,
  showHumidityIcon,
}) => {
  return (
    <Card
      className="bg-white p-4 rounded-xl shadow-lg text-center border border-gray-300"
      sx={{ borderRadius: "24px" }}
    >
      <CardContent>
        <div className="flex items-center justify-center mb-4">
          <img src={imageSrc} alt={title} className="w-10 h-10 mr-2" />
          <div className="text-left">
            <Typography variant="h6" className="text-[#147B72] leading-tight">
              {title.split(" ")[0]} <br /> {title.split(" ")[1]}
            </Typography>
          </div>
        </div>
        <Typography variant="h4" className="font-bold mb-2">
          {value} {unit}
        </Typography>
        <Typography className={`text-${status.color}-600 mb-4`}>
          {status.text}
        </Typography>
        <div className="flex justify-center items-center">
          {showHumidityIcon && (
            <img
              src="/assets/hum.svg"
              alt="Humidity"
              className="w-6 h-6 mr-2"
            />
          )}
          <img src={tmpChrt} alt="Graph" className="w-full h-24" />
        </div>
      </CardContent>
    </Card>
  );
};

export default MeasurementCard;
