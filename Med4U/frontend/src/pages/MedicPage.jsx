import React, { useState } from "react";
import AddPacientForm from "../components/AddPacientForm";
import { useAuth } from "../contexts/AuthContext";
import useMedic from "../hooks/useMedic";
import PacientCard from "../components/PacientCard";
import {
  UserOutlined,
  LogoutOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const MedicPage = () => {
  const { logout } = useAuth();
  const { pacienti, addPacient, loading, error } = useMedic();
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();

  const handleAddPacient = (values) => {
    addPacient(values);
    setShowAddForm(false);
  };

  const handleCardClick = (pacientId) => {
    navigate(`/medic/pacient/${pacientId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-[#147B72] p-4 flex justify-between items-center">
        <h1 className="text-white text-2xl">Bine ai revenit!</h1>
        <button
          onClick={logout}
          className="flex items-center bg-white text-[#147B72] px-4 py-2 rounded-full shadow-md hover:bg-gray-200"
        >
          <LogoutOutlined className="mr-2" /> Logout
        </button>
      </div>
      <div className="p-4">
        {showAddForm ? (
          <div className="relative">
            <button
              onClick={() => setShowAddForm(false)}
              className="absolute left-4 top-4 flex items-center bg-white text-[#147B72] px-4 py-2 rounded-full shadow-md hover:bg-gray-200"
            >
              <ArrowLeftOutlined className="mr-2" /> Revenire
            </button>
            <AddPacientForm onSubmit={handleAddPacient} loading={loading} />
          </div>
        ) : (
          <div
            className="flex flex-col items-center justify-center cursor-pointer"
            onClick={() => setShowAddForm(true)}
          >
            <div className="w-24 h-24 flex items-center justify-center bg-white text-[#147B72] rounded-full mb-2">
              <UserOutlined className="text-4xl" />
            </div>
            <span className="text-[#147B72] font-bold">Adaugă pacient</span>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {pacienti.map((pacient) => (
            <PacientCard
              key={pacient._id}
              pacient={pacient}
              onClick={() => handleCardClick(pacient._id)}
            />
          ))}
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default MedicPage;
