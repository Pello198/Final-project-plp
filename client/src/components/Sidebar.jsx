// src/components/Sidebar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Sidebar({ onToggle }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    if (onToggle) onToggle(!isOpen); // notify parent about sidebar state
  };

  const links = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Tutors", path: "/tutors" },
    { name: "Student Bookings", path: "/student-bookings" },
    { name: "Tutor Bookings", path: "/tutor-bookings" },
    { name: "Profile", path: "/profile" },
    {name: "All Users", path: "/users"},
    { name: "Logout", path: "/logout" },
  ];

  return (
    <>
      {/* Hamburger button */}
      <button
        className="fixed top-4 left-4 z-50 text-gray-700 p-2 rounded-md bg-white shadow-md hover:bg-gray-100"
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Menu</h2>
          <nav className="flex flex-col space-y-4">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-700 font-medium hover:text-blue-500 transition-colors"
                onClick={toggleSidebar}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}
