import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function SingleUserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
  const API_URL = import.meta.env.VITE_API_URL;
      const res = await axios.get(`${API_URL}/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUser(res.data);
    };
    fetchProfile();
  }, [id]);

  if (!user) return <p className="p-6">Loading profile...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}
