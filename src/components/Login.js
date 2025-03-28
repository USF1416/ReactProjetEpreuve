// frontend/src/components/Login.js
import React, { useState } from "react";
import axios from "axios";
// import TwoFactor from "./TwoFactor";
import "../styles/Login.css";

const Login = ({ setUser, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [awaiting2FA, setAwaiting2FA] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la connexion");
    }
  };

  const handleVerified = (data) => {
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("token", data.token);
  };

  /*
  if (awaiting2FA) {
    return <TwoFactor email={email} onVerified={handleVerified} />;
  }
  */

  return (
    <form onSubmit={handleSubmit}>
      <h2>Connexion</h2>
      <div>
        <label>Email : </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Mot de passe : </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default Login;
