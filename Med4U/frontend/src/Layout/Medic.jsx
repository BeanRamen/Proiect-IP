import React, { useContext } from "react";
import { UserProfileContext } from "../Providers/UserProfileContext";

const Medic = () => {
  const { username, userType } = useContext(UserProfileContext);

  return (
    <div>
      <h1>Interfața Medicului</h1>
      <p>
        Bun venit, {username}! Ești autentificat ca {userType}.
      </p>
      {/* Afișează informațiile specifice pentru medic */}
    </div>
  );
};

export default Medic;
