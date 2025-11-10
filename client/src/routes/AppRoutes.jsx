import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import BookSession from "../pages/BookSession";
import Tutors from "../pages/Tutors";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProtectedRoute from "../components/ProtectedRoute";
import StudentBookings from "../pages/StudentBookings";
import TutorBookings from "../pages/TutorBookings";
import { useState } from "react";
import Home from "../pages/Home";
import Login from "../pages/Login";
import RegisterStudent from "../pages/RegisterStudent";
import RegisterTutor from "../pages/RegisterTutor";
import Logout from "../components/Logout";
import Profile from "../pages/Profile";
import AllUsers from "../pages/AllUsers";

import SingleUserProfile from "../pages/SingleUserProfile";


export default function AppRoutes() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <Navbar />
      <Sidebar onToggle={setSidebarOpen} />

      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "md:ml-64" : "md:ml-0"
        }`}
      >
        <Routes>
           <Route path="/" element={<Home />} />
            <Route path="/register/student" element={<RegisterStudent />} />
<Route path="/register/tutor" element={<RegisterTutor />} />
            <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tutors"
            element={
              <ProtectedRoute>
                <Tutors />
              </ProtectedRoute>
            }
          />
            <Route path="/logout" element={<Logout />} />
            <Route path="/profile" element={<Profile />} />
          <Route
            path="/book/:tutorId"
            element={
              <ProtectedRoute>
                <BookSession />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student-bookings"
            element={
              <ProtectedRoute>
                <StudentBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tutor-bookings"
            element={
              <ProtectedRoute>
                <TutorBookings />
              </ProtectedRoute>
            }
          />
          <Route path="/users" element={<AllUsers />} />
          <Route path="/profile/:id" element={<SingleUserProfile />} />

        </Routes>
      </div>
    </Router>
  );
}
