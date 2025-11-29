"use client"

import { useContext } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { AuthContext } from "./AuthContext"

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, currentUser, loading } = useContext(AuthContext)
  const location = useLocation()

  // If still loading auth status, show loading indicator
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location.pathname }} replace />
  }

  // If role is specified and user doesn't have that role, redirect to appropriate dashboard
  if (requiredRole && currentUser.role !== requiredRole) {
    if (currentUser.role === "employer") {
      return <Navigate to="/employer/dashboard" replace />
    } else {
      return <Navigate to="/dashboard" replace />
    }
  }

  // If authenticated and has correct role (or no specific role required), render children
  return children
}

export default ProtectedRoute
