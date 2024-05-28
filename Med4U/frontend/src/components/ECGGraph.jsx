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
import { faker } from "@faker-js/faker";

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

const labels = ["2", "2.5", "3", "3.5", "4", "4.5", "5", "5.5", "6"];

export const data = {
  labels,
  datasets: [
    {
      label: "ECG Estimat",
      data: labels.map(() => faker.number.int({ min: 500, max: 3000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      yAxisID: "y",
    },
    {
      label: "ECG Real",
      data: labels.map(() => faker.number.int({ min: 500, max: 3000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      yAxisID: "y1",
    },
  ],
};

const ECGGraph = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="h-64">
        <Typography className="text-[#147B72] mb-4 text-center">
          ECG Graph
        </Typography>
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default ECGGraph;
