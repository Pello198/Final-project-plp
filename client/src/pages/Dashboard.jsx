// src/pages/Dashboard.jsx
import { Link } from "react-router-dom";
import Card from "../components/Card";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome, {user.name}
        </h1>
        <h3 className="text-gray-600 mb-6">Role: {user.role}</h3>

        {user.role === "student" && (
          <Link to="/tutors">
            <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
              View Tutors
            </button>
          </Link>
        )}

        {user.role === "tutor" && (
          <Link to="/tutor-bookings">
            <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
              View My Bookings
            </button>
          </Link>
        )}
      </Card>
    </div>
  );
}
