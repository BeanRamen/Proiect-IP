import React from "react";
import useAdmin from "../hooks/useAdmin";
import MedicList from "../components/MedicList";
import MedicForm from "../components/MedicForm";

const AdminPage = () => {
  const { medici, addMedic, deleteMedic, loading, error } = useAdmin();

  return (
    <div>
      <h1>Admin Page</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <MedicForm onSubmit={addMedic} loading={loading} />
      <MedicList medici={medici} onDelete={deleteMedic} loading={loading} />
    </div>
  );
};

export default AdminPage;
