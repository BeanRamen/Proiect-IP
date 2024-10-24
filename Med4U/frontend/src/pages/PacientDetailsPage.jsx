import React, { useState, useEffect, useRef } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { backendURL } from "../constants/backendURL";
import Navbar from "../components/Navbar";
import StatusText from "../components/StatusText";
import MeasurementCard from "../components/MeasurementCard";
import ECGGraph from "../components/ECGGraph";
import RecomandariList from "../components/RecomandariList";
import IstoricRecomandari from "../components/IstoricRecomandari";
import FisaMedicalaPdf from "../components/FisaMedicalaPdf";

import bpmIcon from "../assets/bpm.svg";
import tmpIcon from "../assets/tmp.svg";
import humIcon from "../assets/hum.svg";
import { Button, Box, colors } from "@mui/material";

const PacientDetailsPage = () => {
  const { pacientId } = useParams();
  const { user } = useAuth();
  const [pacient, setPacient] = useState(null);
  const [measurements, setMeasurements] = useState({
    puls: 0,
    temperatura: 0,
    umiditate: 0,
    ecg: [],
  });
  const [error, setError] = useState(null);
  const [isIntervalActive, setIsIntervalActive] = useState(false);
  const intervalRef = useRef(null);

  const fetchPacientDetails = async () => {
    try {
      const response = await fetch(`http://${backendURL}:3000/api/ecg`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const ecgData = await response.json();

      setMeasurements({
        puls: ecgData[0]?.puls || 0,
        temperatura: ecgData[0]?.temperatura || 0,
        umiditate: ecgData[0]?.umiditate || 0,
        ecg: ecgData.map((data) => data.ecg) || [],
      });
      console.log("ECG data:", ecgData);
    } catch (error) {
      console.error("Error fetching ECG data:", error);
      setError(error.message);
    }
  };

  const toggleInterval = () => {
    if (isIntervalActive) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    } else {
      fetchPacientDetails(); // Fetch data immediately when activated
      intervalRef.current = setInterval(fetchPacientDetails, 1000);
    }
    setIsIntervalActive(!isIntervalActive);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar pacient={pacient} />
        <div className="p-8 w-4/5 mx-auto">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar pacient={pacient} />
      <div className="p-8 w-4/5 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <StatusText />
          <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
            <MeasurementCard
              imageSrc={bpmIcon}
              title="Bătăile inimii"
              value={measurements.puls}
              unit="bpm"
              status={
                measurements.puls <= 39 || measurements.puls >= 141
                  ? { text: "Atentie!", color: "red" }
                  : (measurements.puls <= 40 && measurements.puls <= 59) ||
                    (measurements.puls >= 121 && measurements.puls <= 140)
                  ? { text: "Aveti grija!", color: "yellow" }
                  : { text: "Normal", color: "green" }
              }
              showHumidityIcon={false}
            />
            <MeasurementCard
              imageSrc={tmpIcon}
              title="Temperatura camerei"
              value={measurements.temperatura}
              unit="°C"
              status={
                measurements.temperatura <= 15.9 ||
                measurements.temperatura >= 26.1
                  ? { text: "Atentie!", color: "red", textColor: "red" }
                  : (measurements.temperatura <= 16 &&
                      measurements.temperatura <= 18.9) ||
                    (measurements.temperatura >= 21.1 &&
                      measurements.temperatura <= 26)
                  ? { text: "Aveti grija!", color: "yellow" }
                  : { text: "Normal", color: "green" }
              }
              showHumidityIcon={false}
            />
            <MeasurementCard
              imageSrc={humIcon}
              title="Umiditatea"
              value={measurements.umiditate}
              unit="%"
              status={
                measurements.umiditate <= 29.9 || measurements.umiditate >= 70.1
                  ? { text: "Atentie!", color: "red" }
                  : (measurements.umiditate >= 30 &&
                      measurements.umiditate <= 39.9) ||
                    (measurements.umiditate >= 61 &&
                      measurements.umiditate <= 70)
                  ? { text: "Aveti grija!", color: "yellow" }
                  : { text: "Normal", color: "green" }
              }
              showHumidityIcon={true}
            />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{ height: "100%" }}
            >
              <Button
                variant="contained"
                onClick={toggleInterval}
                sx={{
                  backgroundColor: "#147B72",
                  "&:hover": {
                    backgroundColor: "#0E5A4E",
                  },
                }}
              >
                {isIntervalActive ? "Stop" : "Start"}
              </Button>
            </Box>
            <div className="col-span-2">
              <ECGGraph ecgData={measurements.ecg} />
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
      <div className="mt-8 w-4/5 mx-auto" id="fisa-medicala">
        <h1 className="py-6 bg-[#147B72] text-white text-center font-semibold text-2xl">
          FISA MEDICALA
        </h1>
        <FisaMedicalaPdf />
      </div>
    </div>
  );
};

export default PacientDetailsPage;
