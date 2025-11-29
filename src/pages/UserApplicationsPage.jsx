"use client"

import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { userService } from "../services/api"
import { AuthContext } from "../context/AuthContext"
import "../pages/styles/UserApplicationsPage.css"

const UserApplicationsPage = () => {
  const { isAuthenticated, currentUser } = useContext(AuthContext)
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeFilter, setActiveFilter] = useState("all")

  useEffect(() => {
    if (isAuthenticated) {
      fetchApplications()
    }
  }, [isAuthenticated])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await userService.getAppliedJobs()
      // Ensure we have an array of applications
      setApplications(response.applications || [])
    } catch (err) {
      console.error("Error fetching applications:", err)
      setError("Failed to load your applications. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  // Filter applications based on status
  const filteredApplications =
    activeFilter === "all" ? applications : applications.filter((app) => app.status?.toLowerCase() === activeFilter)

  // Helper function to get status badge class
  const getStatusBadgeClass = (status) => {
    if (!status) return "status-badge pending"

    switch (status.toLowerCase()) {
      case "pending":
        return "status-badge pending"
      case "reviewing":
        return "status-badge reviewing"
      case "shortlisted":
        return "status-badge shortlisted"
      case "interview":
        return "status-badge interview"
      case "selected":
        return "status-badge selected"
      case "rejected":
        return "status-badge rejected"
      default:
        return "status-badge"
    }
  }

  // Format date safely
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"

    try {
      const options = { year: "numeric", month: "long", day: "numeric" }
      return new Date(dateString).toLocaleDateString(undefined, options)
    } catch (error) {
      console.error("Error formatting date:", error)
      return "Invalid date"
    }
  }

  // Get status description
  const getStatusDescription = (status) => {
    if (!status) return "Your application is being processed."

    switch (status.toLowerCase()) {
      case "pending":
        return "Your application is pending review by the employer."
      case "reviewing":
        return "The employer is currently reviewing your application."
      case "shortlisted":
        return "Congratulations! You've been shortlisted for this position."
      case "interview":
        return "You've been selected for an interview. The employer may contact you soon."
      case "selected":
        return "Congratulations! You've been selected for this position."
      case "rejected":
        return "We're sorry, but your application was not selected for this position."
      default:
        return "Application status is being processed."
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="not-authenticated">
        <h2>Please Log In</h2>
        <p>You need to be logged in to view your applications.</p>
        <div className="auth-buttons">
          <Link to="/login" className="login-btn">
            Log In
          </Link>
          <Link to="/signup" className="signup-btn">
            Sign Up
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="applications-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">My Job Applications</h1>
          <div className="user-info">
            <span className="user-name">
              {currentUser?.firstName || ""} {currentUser?.lastName || ""}
            </span>
            <span className="application-count">
              {applications.length} Application{applications.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading your applications...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <h3>Error</h3>
            <p>{error}</p>
            <button onClick={fetchApplications} className="retry-button">
              Try Again
            </button>
          </div>
        ) : applications.length > 0 ? (
          <>
            <div className="filter-tabs">
              <button
                className={`filter-tab ${activeFilter === "all" ? "active" : ""}`}
                onClick={() => setActiveFilter("all")}
              >
                All Applications
              </button>
              <button
                className={`filter-tab ${activeFilter === "pending" ? "active" : ""}`}
                onClick={() => setActiveFilter("pending")}
              >
                Pending
              </button>
              <button
                className={`filter-tab ${activeFilter === "reviewing" ? "active" : ""}`}
                onClick={() => setActiveFilter("reviewing")}
              >
                Reviewing
              </button>
              <button
                className={`filter-tab ${activeFilter === "shortlisted" ? "active" : ""}`}
                onClick={() => setActiveFilter("shortlisted")}
              >
                Shortlisted
              </button>
              <button
                className={`filter-tab ${activeFilter === "interview" ? "active" : ""}`}
                onClick={() => setActiveFilter("interview")}
              >
                Interview
              </button>
              <button
                className={`filter-tab ${activeFilter === "selected" ? "active" : ""}`}
                onClick={() => setActiveFilter("selected")}
              >
                Selected
              </button>
              <button
                className={`filter-tab ${activeFilter === "rejected" ? "active" : ""}`}
                onClick={() => setActiveFilter("rejected")}
              >
                Rejected
              </button>
            </div>

            <div className="applications-list">
              {filteredApplications.length > 0 ? (
                filteredApplications.map((application) => (
                  <div className="application-card" key={application._id}>
                    <div className="application-header">
                      <div className="company-logo">
                        <img
                          src={application.job?.logo || "/placeholder.svg?height=60&width=60"}
                          alt={`${application.job?.company || "Company"} logo`}
                        />
                      </div>
                      <div className="job-info">
                        <h3 className="job-title">
                          <Link to={`/jobs/${application.job?._id || "#"}`}>
                            {application.job?.title || "Job Title Unavailable"}
                          </Link>
                        </h3>
                        <div className="company-name">{application.job?.company || "Company Unavailable"}</div>
                        <div className="job-meta">
                          <span className="job-location">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                              <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            {application.job?.location || "Location Unavailable"}
                          </span>
                          <span className="job-type">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                            </svg>
                            {application.job?.type || "Job Type Unavailable"}
                          </span>
                        </div>
                      </div>
                      <div className="application-date-status">
                        <div className="application-date">Applied on {formatDate(application.appliedAt)}</div>
                        <div className={getStatusBadgeClass(application.status)}>
                          {application.status
                            ? application.status.charAt(0).toUpperCase() + application.status.slice(1)
                            : "Pending"}
                        </div>
                      </div>
                    </div>

                    <div className="application-body">
                      <div className="status-timeline">
                        <div className={`timeline-step ${application.status ? "active" : ""}`}>
                          <div className="step-icon">1</div>
                          <div className="step-label">Applied</div>
                        </div>
                        <div className="timeline-connector"></div>
                        <div
                          className={`timeline-step ${application.status === "reviewing" || application.status === "shortlisted" || application.status === "interview" || application.status === "selected" || application.status === "rejected" ? "active" : ""}`}
                        >
                          <div className="step-icon">2</div>
                          <div className="step-label">Reviewing</div>
                        </div>
                        <div className="timeline-connector"></div>
                        <div
                          className={`timeline-step ${application.status === "shortlisted" || application.status === "interview" || application.status === "selected" ? "active" : ""}`}
                        >
                          <div className="step-icon">3</div>
                          <div className="step-label">Shortlisted</div>
                        </div>
                        <div className="timeline-connector"></div>
                        <div
                          className={`timeline-step ${application.status === "interview" || application.status === "selected" ? "active" : ""}`}
                        >
                          <div className="step-icon">4</div>
                          <div className="step-label">Interview</div>
                        </div>
                        <div className="timeline-connector"></div>
                        <div className={`timeline-step ${application.status === "selected" ? "active" : ""}`}>
                          <div className="step-icon">5</div>
                          <div className="step-label">Selected</div>
                        </div>
                      </div>

                      <div className="status-description">
                        <p>{getStatusDescription(application.status)}</p>
                        {application.status === "interview" && (
                          <div className="interview-info">
                            <p>The employer may contact you soon to schedule an interview.</p>
                            <p>Make sure your contact information is up to date.</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="application-footer">
                      <Link to={`/jobs/${application.job?._id || "#"}`} className="view-job-btn">
                        View Job Details
                      </Link>
                      {application.status === "interview" && (
                        <button className="schedule-btn">Schedule Interview</button>
                      )}
                      {application.status === "rejected" && (
                        <Link to="/jobs" className="browse-more-btn">
                          Browse More Jobs
                        </Link>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-filtered-applications">
                  <p>No applications found with the selected filter.</p>
                  <button onClick={() => setActiveFilter("all")} className="reset-filter-btn">
                    Show All Applications
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="no-applications">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            <h3>No Applications Yet</h3>
            <p>You haven't applied to any jobs yet. Start exploring opportunities!</p>
            <Link to="/jobs" className="browse-jobs-btn">
              Browse Jobs
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}

export default UserApplicationsPage
