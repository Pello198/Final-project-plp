// src/pages/RegisterStudent.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { Link } from "react-router-dom";
export default function RegisterStudent() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      email,
      password,
      role: "student",
    };

    try {
        const API_URL = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Student registered successfully!");
        navigate("/login");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Student Registration</h2>
        {error && <p className="text-red-500">{error}</p>}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />

        <Button type="submit">Register</Button>
      </form>
      <div flex items-center justify-center>
        <p className="mt-4 text-sm text-gray-600">
      Are you a tutor?{" "}
      <Link
        to="/register/tutor"
        className="text-blue-600 hover:underline"
      >
        Register here
      </Link>
    </p>
      </div>
       
    </div>
  );
}
