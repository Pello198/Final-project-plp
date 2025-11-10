// src/pages/Tutors.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Tutors() {
  const [tutors, setTutors] = useState([]);
  const [subjectFilter, setSubjectFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTutors = async () => {
    setLoading(true);
    try {
        const API_URL = import.meta.env.VITE_API_URL;
      let url = "${API_URL}/api/tutors";
      if (subjectFilter) url += `?subject=${encodeURIComponent(subjectFilter)}`;

      const res = await fetch(url);
      const data = await res.json();
      setTutors(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutors();
  }, [subjectFilter]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Tutors</h2>

      {/* Filter */}
      <div className="mb-6 flex items-center gap-2">
        <input
          type="text"
          placeholder="Filter by subject"
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="border p-2 rounded w-64"
        />
        <button
          onClick={fetchTutors}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
        <button
          onClick={() => { setSubjectFilter(""); }}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Clear
        </button>
      </div>

      {loading ? (
        <p>Loading tutors...</p>
      ) : tutors.length === 0 ? (
        <p>No tutors found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors.map((t) => (
            <div
              key={t.id}
              className="border rounded p-4 shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">{t.name}</h3>
              <p className="mb-1">
                <span className="font-semibold">Subjects:</span> {t.subjects.join(", ")}
              </p>
              
              <Link to={`/book/${t.id}`}>
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  Book Session
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
