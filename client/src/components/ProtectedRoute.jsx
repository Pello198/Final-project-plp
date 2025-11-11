import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user || !user.token) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  // User is authenticated, render children
  return children;
};

export default ProtectedRoute;
