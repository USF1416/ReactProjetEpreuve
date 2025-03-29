import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Profile.css";

const Profile = ({ token }) => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        setError("Impossible de charger le profil.");
        console.error(err);
      }
    };
    if (token) fetchProfile();
    else setError("Non connecté.");
  }, [token]);

  if (error) return <p className="error">{error}</p>;
  if (!profile) return <p className="loading">Chargement du profil...</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>👤 Mon Profil</h2>
        <p>
          <strong>Nom :</strong> {profile.name}
        </p>
        <p>
          <strong>Email :</strong> {profile.email}
        </p>
        <p>
          <strong>Date d'inscription :</strong>{" "}
          {new Date(profile.created_at).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

export default Profile;
