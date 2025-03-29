import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Login.css";

const Login = ({ setUser, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  return (
    <form onSubmit={handleSubmit}>
      <h2>Connexion</h2>
      <div>
        <label>Email :</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Mot de passe :</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <p>
        <Link to="/register">Pas encore inscrit ?</Link>
      </p>
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default Login;
