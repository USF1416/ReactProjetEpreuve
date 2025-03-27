// frontend/src/components/TwoFactor.js
import React, { useState } from "react";
import axios from "axios";
import "../styles/TowFactor.css";

const TwoFactor = ({ email, onVerified }) => {
  const [code, setCode] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/verify-2fa", { email, code });
      onVerified(res.data); // renvoie { token, user }
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la vérification du code");
    }
  };

  return (
    <form onSubmit={handleVerify}>
      <h2>Vérification en 2 étapes</h2>
      <div>
        <label>Code de vérification : </label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
      </div>
      <button type="submit">Vérifier</button>
    </form>
  );
};

export default TwoFactor;
