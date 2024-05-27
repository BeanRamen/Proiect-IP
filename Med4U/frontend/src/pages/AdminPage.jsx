import React from "react";
import useAdmin from "../hooks/useAdmin";
import MedicList from "../components/MedicList";
import MedicForm from "../components/MedicForm";
import { useAuth } from "../contexts/AuthContext";

const AdminPage = () => {
  const { logout } = useAuth();
  const { medici, addMedic, deleteMedic, loading, error } = useAdmin();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex items-center justify-between bg-[#147B72] p-4">
        <h1 className="text-white text-2xl font-bold text-center">
          Admin Page
        </h1>
        <button
          onClick={logout}
          className="bg-white text-[#147B72] py-2 px-4 rounded-full shadow-md hover:bg-gray-200"
        >
          Logout
        </button>
      </div>

      <div className="container mx-auto p-4">
        {error && <p className="text-red-600">{error}</p>}
        <MedicForm onSubmit={addMedic} loading={loading} />
        <MedicList medici={medici} onDelete={deleteMedic} loading={loading} />
      </div>
    </div>
  );
};

export default AdminPage;
