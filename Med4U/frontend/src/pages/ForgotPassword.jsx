import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [inputType, setInputType] = useState("email");

  const handleEmailClick = () => {
    setInputType("email");
  };

  const handlePhoneClick = () => {
    setInputType("phone");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-white p-8 rounded-3xl shadow-emerald-700 w-full max-w-md">
        <Link to="/login" className="absolute left-4 top-4 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </Link>

        <h2 className="text-2xl font-bold mb-6 text-center">
          Ai uitat parola?
        </h2>
        <span className="font-medium text-gray-500">
          Introduceți{" "}
          {inputType === "email" ? "email-ul" : "numărul de telefon"} pentru a
          vă trimite un cod de confirmare
        </span>

        <div className="mt-4 flex flex-col ">
          <div className="w-full inline-flex mb-2 ">
            <button
              className={`flex-grow px-4 py-2 rounded-l-md ${
                inputType === "email"
                  ? "bg-[#147B72] text-white"
                  : "bg-gray-300 text-gray-700"
              } transition`}
              onClick={handleEmailClick}
            >
              Email
            </button>
            <button
              className={`flex-grow px-4 py-2 rounded-r-md ${
                inputType === "phone"
                  ? "bg-[#147B72] text-white"
                  : "bg-gray-300 text-gray-700"
              } transition`}
              onClick={handlePhoneClick}
            >
              Telefon
            </button>
          </div>
          <input
            type="text"
            className="border border-gray-300 rounded-2xl p-2 w-full mb-2"
            placeholder={inputType === "email" ? "Email" : "Telefon"}
          />
          <button className="border border-gray-300 rounded-2xl p-2 w-full bg-[#147B72] text-white hover:bg-white hover:text-[#147B72]">
            Trimite codul
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
