import React from "react";
import { Typography } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "",
    },
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
    },
    y1: {
      type: "linear",
      display: true,
      position: "right",
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

const ECGGraph = ({ ecgData }) => {
  const data = {
    labels: Array.from({ length: ecgData.length }, (_, i) => i + 1),
    datasets: [
      {
        label: "ECG Data",
        data: ecgData,
        borderColor: "rgb(139, 0, 0)",
        backgroundColor: "rgba(139, 0, 0, 0.5)",
        yAxisID: "y",
      },
    ],
  };

  return (
    <div
      className="bg-white p-6 rounded-xl shadow-lg"
      style={{ height: "100%" }}
    >
      <div
        className="h-64 sm:h-96 md:h-auto"
        style={{ position: "relative", width: "100%", height: "100%" }}
      >
        <Typography className="text-[#147B72] mb-4 text-center">
          ECG Graph
        </Typography>
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default ECGGraph;
