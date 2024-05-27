import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { backendURL } from "../constants/backendURL";
import { Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import StatusText from "../components/StatusText";
import MeasurementCard from "../components/MeasurementCard";
import ECGGraph from "../components/ECGGraph";
import RecomandariList from "../components/RecomandariList";
import IstoricRecomandari from "../components/IstoricRecomandari";

const PacientDetailsPage = () => {
  const { pacientId } = useParams();
  const { user } = useAuth();
  const [pacient, setPacient] = useState(null);
  const [measurements, setMeasurements] = useState({
    puls: 98,
    temperatura: 38.3,
    ecg: [],
  });

  useEffect(() => {
    const fetchPacientDetails = async () => {
      try {
        const response = await fetch(
          `http://${backendURL}:3000/api/auth/pacienti/${pacientId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPacient(data);
      } catch (error) {
        console.error("Error fetching pacient details:", error);
      }
    };

    fetchPacientDetails();
  }, [pacientId]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar pacient={pacient} />
      <div className="p-8 w-4/5 mx-auto">
        <Typography variant="h4" className="text-center text-[#147B72] mb-8">
          Statusul măsurătorilor de astăzi
        </Typography>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <StatusText />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MeasurementCard
              imageSrc="/bpm.svg"
              title="Bătăile inimii"
              value={measurements.puls}
              unit="bpm"
              status={{ text: "Normal", color: "green" }}
            />
            <MeasurementCard
              imageSrc="/temp.svg"
              title="Temperatura corpului"
              value={measurements.temperatura}
              unit="°C"
              status={{ text: "Aveți grijă!", color: "yellow" }}
            />
            <div className="col-span-2">
              <ECGGraph />
            </div>
          </div>
        </div>
      </div>
      <div id="recomandari" className="mt-8 w-4/5 mx-auto">
        <RecomandariList
          pacientId={pacientId}
          isMedic={user.role === "medic"}
        />
      </div>
      <div id="istoric" className="mt-8 w-4/5 mx-auto">
        <IstoricRecomandari pacientId={pacientId} />
      </div>
    </div>
  );
};

export default PacientDetailsPage;
