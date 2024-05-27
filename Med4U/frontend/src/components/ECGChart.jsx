import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "#1e272e",
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: "#f5f6fa",
  marginBottom: theme.spacing(2),
}));

const ECGChart = () => {
  const [ecgData, setEcgData] = useState({
    labels: [],
    datasets: [
      {
        label: "ECG Data",
        data: [],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/path/to/your/ecg.json");
        const data = response.data;

        const labels = data.map((point) => point.x);
        const ecgValues = data.map((point) => point.y);

        setEcgData({
          labels: labels,
          datasets: [
            {
              label: "ECG Data",
              data: ecgValues,
              borderColor: "rgba(75,192,192,1)",
              backgroundColor: "rgba(75,192,192,0.2)",
              borderWidth: 2,
              pointRadius: 0,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching ECG data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <StyledPaper>
      <StyledTypography variant="h6">ECG Chart</StyledTypography>
      <Line
        data={ecgData}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </StyledPaper>
  );
};

export default ECGChart;
