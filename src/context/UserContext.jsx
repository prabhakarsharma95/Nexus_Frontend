"use client"

import { createContext, useState, useContext } from "react"
import { userService } from "../services/api"
import { AuthContext } from "./AuthContext"

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const { refreshUser } = useContext(AuthContext)
  const [profile, setProfile] = useState(null)
  const [savedJobs, setSavedJobs] = useState([])
  const [appliedJobs, setAppliedJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getUserProfile = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await userService.getUserProfile()
      setProfile(response.user)
      return response.user
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch user profile")
      return null
    } finally {
      setLoading(false)
    }
  }

  const updateUserProfile = async (userData) => {
    try {
      setLoading(true)
      setError(null)
      const response = await userService.updateUserProfile(userData)
      setProfile(response.user)
      await refreshUser() // Update user in auth context
      return response.user
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update user profile")
      return null
    } finally {
      setLoading(false)
    }
  }

  const changePassword = async (passwordData) => {
    try {
      setLoading(true)
      setError(null)
      await userService.changePassword(passwordData)
      return true
    } catch (err) {
      setError(err.response?.data?.error || "Failed to change password")
      return false
    } finally {
      setLoading(false)
    }
  }

  const saveJob = async (jobId) => {
    try {
      setLoading(true)
      setError(null)
      await userService.saveJob(jobId)
      await getSavedJobs() // Refresh saved jobs
      return true
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save job")
      return false
    } finally {
      setLoading(false)
    }
  }

  const unsaveJob = async (jobId) => {
    try {
      setLoading(true)
      setError(null)
      await userService.unsaveJob(jobId)
      setSavedJobs(savedJobs.filter((job) => job._id !== jobId))
      return true
    } catch (err) {
      setError(err.response?.data?.error || "Failed to unsave job")
      return false
    } finally {
      setLoading(false)
    }
  }

  const getSavedJobs = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await userService.getSavedJobs()
      setSavedJobs(response.savedJobs)
      return response.savedJobs
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch saved jobs")
      return []
    } finally {
      setLoading(false)
    }
  }

  const getAppliedJobs = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await userService.getAppliedJobs()
      setAppliedJobs(response.appliedJobs)
      return response.appliedJobs
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch applied jobs")
      return []
    } finally {
      setLoading(false)
    }
  }

  const value = {
    profile,
    savedJobs,
    appliedJobs,
    loading,
    error,
    getUserProfile,
    updateUserProfile,
    changePassword,
    saveJob,
    unsaveJob,
    getSavedJobs,
    getAppliedJobs,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
