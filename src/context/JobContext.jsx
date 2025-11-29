"use client"

import { createContext, useState, useEffect, useCallback } from "react"
import { jobService } from "../services/api"

export const JobContext = createContext()

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([])
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    type: "",
    location: "",
    experience: "",
    salary: "",
    page: 1,
    limit: 10,
    sort: "newest",
  })
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalJobs: 0,
  })

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await jobService.getAllJobs(filters)
      setJobs(response.jobs)
      setPagination({
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        totalJobs: response.totalJobs,
      })
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch jobs")
    } finally {
      setLoading(false)
    }
  }, [filters])

  const fetchJobById = async (id) => {
    try {
      setLoading(true)
      setError(null)
      const response = await jobService.getJobById(id)
      setJob(response.job)
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch job details")
    } finally {
      setLoading(false)
    }
  }

  const createJob = async (jobData) => {
    try {
      setLoading(true)
      setError(null)
      const response = await jobService.createJob(jobData)
      return response.job
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create job")
      return null
    } finally {
      setLoading(false)
    }
  }

  const updateJob = async (id, jobData) => {
    try {
      setLoading(true)
      setError(null)
      const response = await jobService.updateJob(id, jobData)
      return response.job
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update job")
      return null
    } finally {
      setLoading(false)
    }
  }

  const deleteJob = async (id) => {
    try {
      setLoading(true)
      setError(null)
      await jobService.deleteJob(id)
      return true
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete job")
      return false
    } finally {
      setLoading(false)
    }
  }

  const applyForJob = async (id, applicationData) => {
    try {
      setLoading(true)
      setError(null)
      const response = await jobService.applyForJob(id, applicationData)
      return response
    } catch (err) {
      setError(err.response?.data?.error || "Failed to apply for job")
      return null
    } finally {
      setLoading(false)
    }
  }

  const getEmployerJobs = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await jobService.getEmployerJobs()
      return response.jobs
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch employer jobs")
      return []
    } finally {
      setLoading(false)
    }
  }

  const getJobApplicants = async (id) => {
    try {
      setLoading(true)
      setError(null)
      const response = await jobService.getJobApplicants(id)
      return response.applicants
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch job applicants")
      return []
    } finally {
      setLoading(false)
    }
  }

  const updateApplicantStatus = async (jobId, applicantId, status) => {
    try {
      setLoading(true)
      setError(null)
      await jobService.updateApplicantStatus(jobId, applicantId, status)
      return true
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update applicant status")
      return false
    } finally {
      setLoading(false)
    }
  }

  const updateFilters = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
      page: newFilters.page || 1, // Reset to page 1 when filters change
    }))
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "",
      type: "",
      location: "",
      experience: "",
      salary: "",
      page: 1,
      limit: 10,
      sort: "newest",
    })
  }

  useEffect(() => {
    fetchJobs()
  }, [fetchJobs])

  const value = {
    jobs,
    job,
    loading,
    error,
    filters,
    pagination,
    fetchJobs,
    fetchJobById,
    createJob,
    updateJob,
    deleteJob,
    applyForJob,
    getEmployerJobs,
    getJobApplicants,
    updateApplicantStatus,
    updateFilters,
    clearFilters,
  }

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>
}
