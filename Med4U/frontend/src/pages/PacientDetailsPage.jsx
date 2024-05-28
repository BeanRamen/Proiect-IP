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
import FisaMedicalaPdf from "../components/FisaMedicalaPdf";

import bpmIcon from "../assets/bpm.svg";
import tmpIcon from "../assets/tmp.svg";
import humIcon from "../assets/hum.svg";

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
        setPacient(data.pacient);
        setMeasurements({
          puls: data.ecgData?.puls || 0,
          temperatura: data.ecgData?.temperatura || 0,
          umiditate: data.ecgData?.umiditate || 0,
          ecg: data.ecgData?.ecg || [],
        });
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <StatusText />
          <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
            <MeasurementCard
              imageSrc={bpmIcon}
              title="Bătăile inimii"
              value={measurements.puls}
              unit="bpm"
              status={{ text: "Normal", color: "green" }}
              showHumidityIcon={false}
            />
            <MeasurementCard
              imageSrc={tmpIcon}
              title="Temperatura corpului"
              value={measurements.temperatura}
              unit="°C"
              status={{ text: "Aveți grijă!", color: "yellow" }}
              showHumidityIcon={false}
            />
            <MeasurementCard
              imageSrc={humIcon}
              title="Umiditatea"
              value={measurements.umiditate}
              unit="%"
              status={{ text: "Normal", color: "green" }}
              showHumidityIcon={true}
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
      <div className="mt-8 w-4/5 mx-auto">
        <h1 className=" py-6 bg-[#147B72] text-white text-center font-semibold text-2xl">
          FISA MEDICALA
        </h1>
        <FisaMedicalaPdf />
      </div>
    </div>
  );
};

export default PacientDetailsPage;
