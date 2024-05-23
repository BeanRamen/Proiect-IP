import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { UserProfileContext } from "../Providers/UserProfileContext";

const Authentication = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { setUsername, setUserType } = useContext(UserProfileContext);
  const navigate = useNavigate();
  const [placeholderText, setPlaceholderText] = useState("Introduceti CNP-ul");

  const onSubmit = async (data) => {
    try {
      // Logica de autentificare

      // Setează starea contextului utilizatorului după autentificare
      if (data.userType === "pacient") {
        setUsername(data.username);
        setUserType("pacient");
        navigate("/pacient");
      } else if (data.userType === "medic") {
        setUsername(data.username);
        setUserType("medic");
        navigate("/medic");
      }
    } catch (error) {
      // Tratează eroarea de autentificare
      console.error("Eroare la autentificare:", error);
      // Afisează un mesaj de eroare sau efectuează alte acțiuni corespunzătoare
    }
    console.log(data);
  };

  const handleUserTypeChange = (e) => {
    if (e.target.value === "pacient") {
      setPlaceholderText("Introduceti CNP-ul");
    } else if (e.target.value === "medic") {
      setPlaceholderText("Introduceti codul de parafa");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8  rounded-3xl  shadow-emerald-700 w-full max-w-md">
        <Link to="/" className="absolute left-4 top-4">
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
        <h2 className="text-2xl font-bold mb-6 text-center">Autentificare</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="userType"
              className="block text-sm font-medium text-gray-700"
            >
              Selectați tipul de utilizator:
            </label>
            <select
              id="userType"
              {...register("userType")}
              onChange={(e) => {
                handleUserTypeChange(e);
                setUserType(e.target.value);
              }}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#147B72] focus:border-[#147B72] sm:text-sm"
            >
              <option value="pacient">Pacient</option>
              <option value="medic">Medic</option>
            </select>
            {errors.userType && (
              <p className="text-red-500 text-sm">{errors.userType.message}</p>
            )}
          </div>

          {/* <div className="mb-4">
            <input
              id="username"
              type="text"
              required
              placeholder="Introduceti username-ul"
              {...register("username")}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#147B72] focus:border-[#147B72] sm:text-sm"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div> */}

          {watch("userType") === "pacient" && (
            <div className="mb-4">
              <input
                id="cnp"
                type="text"
                required
                placeholder={placeholderText}
                {...register("cnp")}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#147B72] focus:border-[#147B72] sm:text-sm"
              />
              {errors.cnp && (
                <p className="text-red-500 text-sm">{errors.cnp.message}</p>
              )}
            </div>
          )}

          {watch("userType") === "medic" && (
            <div className="mb-4">
              <input
                id="parafa"
                type="text"
                required
                placeholder={placeholderText}
                {...register("parafa")}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#147B72] focus:border-[#147B72] sm:text-sm"
              />
              {errors.parafa && (
                <p className="text-red-500 text-sm">{errors.parafa.message}</p>
              )}
            </div>
          )}

          <div className="mb-4">
            <input
              required
              id="password"
              type="password"
              placeholder="Introduceti parola"
              {...register("password")}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline -none focus:ring-[#147B72] focus:border-[#147B72] sm:text-sm"
            ></input>

            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="mb-4 text-right">
            <Link to="/forgot-password" className="text-[#147B72] text-sm">
              Ați uitat parola?
            </Link>
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-[#147B72] text-white rounded-full shadow-md hover:bg-white hover:text-[#147B72] mb-3 w-full"
          >
            Autentificare
          </button>
        </form>
      </div>
    </div>
  );
};

export default Authentication;
