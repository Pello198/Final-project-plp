import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const API_URL = import.meta.env.VITE_API_URL;

        // Use backticks for template literal
        const res = await axios.get(`${API_URL}/api/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Ensure res.data is always an array
        setUsers(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setUsers([]); // fallback to empty array
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>

      <div className="space-y-3">
        {users.length > 0 ? (
          users.map((u) => (
            <Link
              to={`/profile/${u._id}`}
              key={u._id}
              className="block border p-3 rounded hover:bg-gray-100 transition"
            >
              <p className="font-medium">{u.name}</p>
              <p className="text-sm text-gray-600">Role: {u.role}</p>
            </Link>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
