import React from "react";
import { UserOutlined } from "@ant-design/icons";

const PacientCard = ({ pacient, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex flex-col items-center"
    >
      <div className="w-24 h-24 flex items-center justify-center bg-[#147B72] text-white rounded-full mb-2">
        <UserOutlined className="text-4xl" />
      </div>
      <span className="text-[#147B72] font-bold">{pacient.nume}</span>
    </div>
  );
};

export default PacientCard;
