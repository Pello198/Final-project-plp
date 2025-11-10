// src/pages/BookSession.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function BookSession() {
  const { tutorId } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [subject, setSubject] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      tutor: tutorId,
      subject,
      scheduledAt,
      notes,
    };
  const API_URL = import.meta.env.VITE_API_URL;
    await fetch(`${API_URL}/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(payload),
    });

    alert("Booking created!");
    navigate("/dashboard");
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Book Session</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        /><br /><br />

        <input
          type="datetime-local"
          value={scheduledAt}
          onChange={(e) => setScheduledAt(e.target.value)}
        /><br /><br />

        <textarea
          placeholder="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        /><br /><br />

        <button type="submit">Submit Booking</button>
      </form>
    </div>
  );
}
