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

  if (error) return <p>Erreur : {error}</p>;
  if (!profile) return <p>Chargement du profil...</p>;

  return (
    <div>
      <h2>Mon Profil</h2>
      <p>Nom : {profile.name}</p>
      <p>Email : {profile.email}</p>
      <p>Date d'inscription : {profile.created_at}</p>
    </div>
  );
};

export default Profile;
