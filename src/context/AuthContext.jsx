"use client"

import { createContext, useState, useEffect } from "react"
import { authService } from "../services/api"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if user is already logged in
    const checkAuthStatus = async () => {
      try {
        const storedUser = localStorage.getItem("user")
        const token = localStorage.getItem("token")

        if (storedUser && token) {
          // Validate token with backend
          const userData = await authService.getCurrentUser()
          setCurrentUser(userData.user)
          setIsAuthenticated(true)
        }
      } catch (err) {
        console.error("Auth check error:", err)
        // Clear invalid auth data
        localStorage.removeItem("user")
        localStorage.removeItem("token")
      } finally {
        setLoading(false)
      }
    }

    checkAuthStatus()
  }, [])

  const signup = async (userData) => {
    setError(null)
    try {
      const response = await authService.register(userData)
      setCurrentUser(response.user)
      setIsAuthenticated(true)
      return true
    } catch (err) {
      console.error("Signup error:", err)
      setError(err.response?.data?.message || "Failed to create account")
      return false
    }
  }

  const login = async (credentials) => {
    setError(null)
    try {
      const response = await authService.login(credentials)
      setCurrentUser(response.user)
      setIsAuthenticated(true)
      return true
    } catch (err) {
      console.error("Login error:", err)
      setError(err.response?.data?.message || "Invalid email or password")
      return false
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
      setCurrentUser(null)
      setIsAuthenticated(false)
    } catch (err) {
      console.error("Logout error:", err)
    }
  }

  const value = {
    currentUser,
    isAuthenticated,
    loading,
    error,
    signup,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
