// frontend/src/components/Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/Profile.css";

const Profile = ({ token }) => {
  const [profile, setProfile] = useState(null);
  
  const fetchProfile = async () => {
    try {
      const res = await axios.get('/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
    fetchProfile();
  }, []);
  
  if (!profile) return <p>Chargement...</p>;
  
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
