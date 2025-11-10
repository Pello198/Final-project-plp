// src/routes/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  
  const isAuthenticated = localStorage.getItem("token"); // example: token stored in localStorage

  if (!isAuthenticated) {
    // If user is not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child component
  return children;
};

export default ProtectedRoute;
