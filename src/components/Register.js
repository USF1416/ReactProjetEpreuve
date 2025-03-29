import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Register.css";

const Register = ({ setUser, setToken }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'inscription");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Inscription</h2>
      <div>
        <label>Nom :</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
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
        <Link to="/login">Déjà inscrit ?</Link>
      </p>
      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default Register;
