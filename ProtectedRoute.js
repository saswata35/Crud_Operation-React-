import React from "react";
import { Navigate, useLocation } from "react-router-dom";

/**
 * ProtectedRoute ensures that only authenticated users can access
 * the wrapped route. If not authenticated, redirects to the login page.
 */
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login and preserve the current location
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
