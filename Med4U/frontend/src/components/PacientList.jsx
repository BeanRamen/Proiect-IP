import React from "react";

const PacientList = ({ pacienti }) => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {pacienti.map((pacient) => (
        <div key={pacient._id} className="flex flex-col items-center">
          <div className="bg-teal-500 rounded-full w-24 h-24 flex items-center justify-center mb-2">
            <span className="text-white text-4xl">👤</span>
          </div>
          <p className="text-center font-semibold">{pacient.nume}</p>
        </div>
      ))}
    </div>
  );
};

export default PacientList;
