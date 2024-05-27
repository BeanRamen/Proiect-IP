import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const MeasurementCard = ({ imageSrc, title, value, unit, status }) => {
  return (
    <Card className="bg-white p-4 rounded shadow-lg text-center">
      <CardContent>
        <img src={imageSrc} alt={title} className="w-16 mx-auto" />
        <Typography variant="h6" className="text-[#147B72]">
          {title}
        </Typography>
        <Typography variant="h4" className="font-bold">
          {value} {unit}
        </Typography>
        <Typography className={`text-${status.color}-600`}>
          {status.text}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MeasurementCard;
