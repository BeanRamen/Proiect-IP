import React, { useState } from "react";
import AddPacientForm from "../components/AddPacientForm";
import { useAuth } from "../contexts/AuthContext";
import useMedic from "../hooks/useMedic";
import PacientCard from "../components/PacientCard";
import { Dropdown, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
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

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  console.log("Pacienti:", pacienti); // Adăugăm log pentru debug

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-[#147B72] p-4 flex justify-between items-center">
        <h1 className="text-white text-2xl">Bine ai revenit!</h1>
        <Dropdown menu={menu} trigger={["click"]}>
          <UserOutlined className="text-white text-2xl cursor-pointer" />
        </Dropdown>
      </div>
      <div className="p-4">
        {showAddForm ? (
          <AddPacientForm onSubmit={handleAddPacient} loading={loading} />
        ) : (
          <div
            className="flex flex-col items-center justify-center cursor-pointer"
            onClick={() => setShowAddForm(true)}
          >
            <div className="w-24 h-24 flex items-center justify-center bg-[#147B72] text-white rounded-full mb-2">
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
