// src/pages/Home.jsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-6">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 text-center">
        Welcome to TutorConnect
      </h1>
      <p className="text-gray-600 text-center max-w-lg mb-8">
        Find the perfect tutor for your learning needs. Whether you're a student looking for help or a tutor ready to share your expertise, we’ve got you covered.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/register/student">
          <button className="bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition">
            Register as Student
          </button>
        </Link>
        <Link to="/register/tutor">
          <button className="bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 transition">
            Register as Tutor
          </button>
        </Link>
        <Link to="/login">
          <button className="bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}
