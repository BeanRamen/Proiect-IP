import React from "react";
import Logo from "../assets/LogoappLogo.png";
import { useNavigate } from "react-router-dom";
// import AuthBtn from "../components/AuthBtn";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col bg-gray-100 items-center justify-start min-h-screen relative overflow-hidden">
        <img src={Logo} alt="Med4U Logo" className="w-36 h-30 mb-4 mt-12" />
        <p className="text-xl font-semibold mb-2">Să începem!</p>
        <span className="text-center mb-4">
          Conectați-vă pentru a vă bucura de funcțiile pe <br /> care vi le-am
          oferit și rămâneți sănătoși!
        </span>
        <button
          className="px-4 py-2 bg-[#147B72] text-white  rounded-full shadow-md hover:bg-white hover:text-[#147B72] mb-0  w-52"
          onClick={() => navigate("/login")}
        >
          Autentificare
        </button>

        <button
          className="px-4 py-2 bg-transparent text-[#147B72] rounded-full shadow-md hover:bg-[#147B72] hover:text-white w-64"
          onClick={() => navigate("/register")}
        >
          Cont nou
        </button>

        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 500 200"
          className="absolute  bottom-24 left-1/2 transform -translate-x-1/2 w-full max-w-[500px] transition-all duration-500 ease-in-out"
          xmlSpace="preserve"
        >
          <g>
            <polyline
              className="ekg fill-none stroke-[#147B72] stroke-[3] stroke-linecap-round stroke-linejoin-miter opacity-0 animate-ekg"
              points="486.6,113.8 328.2,113.8 310.3,132.3 296,70.7 246.8,127.4 241.6,120.2 233.9,166.4 227,27.6 
      213.2,118.3 211.8,112.3 205.1,126.1 198.2,108.5 194.1,124.4 184.5,92.9 174.1,113 4.3,113"
            />
          </g>
        </svg>
      </div>
    </>
  );
};

export default HomePage;
//147B72
