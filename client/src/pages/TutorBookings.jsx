// src/pages/TutorBookings.jsx
import { useEffect, useState } from "react";
import Card from "../components/Card";

export default function TutorBookings() {
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;
    fetch(`${API_URL}/api/bookings?tutor=${ user._id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Bookings For My Tutor Account
      </h2>

      <div className="w-full max-w-2xl space-y-4">
        {bookings.length === 0 && (
          <p className="text-gray-500 text-center">No bookings yet.</p>
        )}

        {bookings.map((b) => (
          <Card key={b._id} className="p-4">
            <p className="font-semibold text-gray-700">Student: {b.student}</p>
            <p className="text-gray-600">{b.subject}</p>
            <p className="text-gray-600">{new Date(b.scheduledAt).toLocaleString()}</p>
            <p
              className={`mt-2 font-medium ${
                b.status === "confirmed"
                  ? "text-green-600"
                  : b.status === "pending"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              Status: {b.status}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
