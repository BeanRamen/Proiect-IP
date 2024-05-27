import React from "react";
import { Button } from "antd";

const MedicList = ({ medici, onDelete, loading }) => {
  const handleDelete = async (medicId) => {
    onDelete(medicId);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-[#147B72] text-white">
          <tr>
            <th className="py-2 px-4 border-b text-left">Nume</th>
            <th className="py-2 px-4 border-b text-left">Cod Parafă</th>
            <th className="py-2 px-4 border-b text-left">Specializare</th>
            <th className="py-2 px-4 border-b text-left">Email</th>
            <th className="py-2 px-4 border-b text-left">Număr Telefon</th>
            <th className="py-2 px-4 border-b text-center">Acțiuni</th>
          </tr>
        </thead>
        <tbody>
          {medici.map((medic) => (
            <tr key={medic._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b text-left">{medic.nume}</td>
              <td className="py-2 px-4 border-b text-left">
                {medic.codParafa}
              </td>
              <td className="py-2 px-4 border-b text-left">
                {medic.specializare}
              </td>
              <td className="py-2 px-4 border-b text-left">{medic.email}</td>
              <td className="py-2 px-4 border-b text-left">
                {medic.numar_telefon}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <Button
                  type="primary"
                  danger
                  onClick={() => handleDelete(medic._id)}
                  loading={loading}
                  className="bg-red-500 hover:bg-red-700 text-white rounded-full px-4 py-2"
                >
                  Șterge
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicList;
