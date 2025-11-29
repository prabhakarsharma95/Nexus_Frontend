"use client"

import { useState, useEffect, useContext } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { jobService } from "../services/api"
import { AuthContext } from "../context/AuthContext"
import "../pages/styles/JobApplicantsPage.css"

const JobApplicantsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentUser, isAuthenticated } = useContext(AuthContext)
  const [job, setJob] = useState(null)
  const [applicants, setApplicants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedApplicant, setSelectedApplicant] = useState(null)
  const [showApplicantDetails, setShowApplicantDetails] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/job/${id}/applicants` } })
      return
    }

    fetchJobAndApplicants()
  }, [id, isAuthenticated, navigate])

  const fetchJobAndApplicants = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch job details
      const jobResponse = await jobService.getJobById(id)
      setJob(jobResponse.job)

      // Check if current user is the employer
      if (currentUser.id !== jobResponse.job.employer._id && currentUser.role !== "admin") {
        navigate("/dashboard")
        return
      }

      // Fetch applicants
      const applicantsResponse = await jobService.getJobApplicants(id)
      setApplicants(applicantsResponse.applicants)
    } catch (err) {
      console.error("Error fetching job and applicants:", err)
      setError(err.response?.data?.message || "Failed to load applicants")
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (applicantId, newStatus) => {
    try {
      await jobService.updateApplicantStatus(id, applicantId, newStatus)

      // Update applicant status in local state
      setApplicants(
        applicants.map((applicant) =>
          applicant._id === applicantId ? { ...applicant, status: newStatus } : applicant,
        ),
      )

      // If the selected applicant's status was changed, update it
      if (selectedApplicant && selectedApplicant._id === applicantId) {
        setSelectedApplicant({ ...selectedApplicant, status: newStatus })
      }
    } catch (err) {
      console.error("Error updating applicant status:", err)
      alert("Failed to update applicant status. Please try again.")
    }
  }

  const handleViewApplicant = (applicant) => {
    setSelectedApplicant(applicant)
    setShowApplicantDetails(true)
  }

  // Filter applicants based on status
  const filteredApplicants =
    activeFilter === "all" ? applicants : applicants.filter((app) => app.status.toLowerCase() === activeFilter)

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading applicants...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={fetchJobAndApplicants} className="retry-button">
          Try Again
        </button>
      </div>
    )
  }

  return (
    <main className="job-applicants-page">
      <div className="container">
        <div className="page-header">
          <div className="header-left">
            <Link to="/dashboard" className="back-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Back to Dashboard
            </Link>
            <h1 className="page-title">Applicants for {job.title}</h1>
          </div>
          <div className="job-meta">
            <span className="applicant-count">
              {applicants.length} Applicant{applicants.length !== 1 ? "s" : ""}
            </span>
            <Link to={`/jobs/${id}`} className="view-job-btn">
              View Job Post
            </Link>
          </div>
        </div>

        <div className="job-summary">
          <div className="company-logo">
            <img src={job.logo || "/placeholder.svg?height=60&width=60"} alt={`${job.company} logo`} />
          </div>
          <div className="job-info">
            <h2>{job.title}</h2>
            <div className="job-details">
              <span className="company-name">{job.company}</span>
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
                {job.location}
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
                {job.type}
              </span>
              <span className="job-posted-date">
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
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Posted on {formatDate(job.createdAt)}
              </span>
            </div>
          </div>
          <div className="job-status">
            <span className={`status-badge status-${job.status}`}>
              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
            </span>
          </div>
        </div>

        {applicants.length > 0 ? (
          <div className="applicants-container">
            <div className="filter-tabs">
              <button
                className={`filter-tab ${activeFilter === "all" ? "active" : ""}`}
                onClick={() => setActiveFilter("all")}
              >
                All Applicants ({applicants.length})
              </button>
              <button
                className={`filter-tab ${activeFilter === "pending" ? "active" : ""}`}
                onClick={() => setActiveFilter("pending")}
              >
                Pending ({applicants.filter((a) => a.status === "pending").length})
              </button>
              <button
                className={`filter-tab ${activeFilter === "reviewing" ? "active" : ""}`}
                onClick={() => setActiveFilter("reviewing")}
              >
                Reviewing ({applicants.filter((a) => a.status === "reviewing").length})
              </button>
              <button
                className={`filter-tab ${activeFilter === "shortlisted" ? "active" : ""}`}
                onClick={() => setActiveFilter("shortlisted")}
              >
                Shortlisted ({applicants.filter((a) => a.status === "shortlisted").length})
              </button>
              <button
                className={`filter-tab ${activeFilter === "interview" ? "active" : ""}`}
                onClick={() => setActiveFilter("interview")}
              >
                Interview ({applicants.filter((a) => a.status === "interview").length})
              </button>
              <button
                className={`filter-tab ${activeFilter === "selected" ? "active" : ""}`}
                onClick={() => setActiveFilter("selected")}
              >
                Selected ({applicants.filter((a) => a.status === "selected").length})
              </button>
              <button
                className={`filter-tab ${activeFilter === "rejected" ? "active" : ""}`}
                onClick={() => setActiveFilter("rejected")}
              >
                Rejected ({applicants.filter((a) => a.status === "rejected").length})
              </button>
            </div>

            <div className="applicants-list">
              <div className="applicants-header">
                <div className="header-applicant">Applicant</div>
                <div className="header-applied">Applied On</div>
                <div className="header-status">Status</div>
                <div className="header-actions">Actions</div>
              </div>

              {filteredApplicants.length > 0 ? (
                filteredApplicants.map((applicant) => (
                  <div className="applicant-item" key={applicant._id}>
                    <div className="applicant-info">
                      <div className="applicant-avatar">
                        {applicant.user.firstName.charAt(0)}
                        {applicant.user.lastName.charAt(0)}
                      </div>
                      <div className="applicant-details">
                        <h4 className="applicant-name">
                          {applicant.user.firstName} {applicant.user.lastName}
                        </h4>
                        <div className="applicant-email">{applicant.user.email}</div>
                        <div className="applicant-location">{applicant.user.location || "Location not specified"}</div>
                      </div>
                    </div>

                    <div className="applied-date">{formatDate(applicant.appliedAt)}</div>

                    <div className="applicant-status">
                      <select
                        value={applicant.status}
                        onChange={(e) => handleStatusChange(applicant._id, e.target.value)}
                        className={`status-select status-${applicant.status.toLowerCase()}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewing">Reviewing</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="interview">Interview</option>
                        <option value="selected">Selected</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>

                    <div className="applicant-actions">
                      <button className="view-application-btn" onClick={() => handleViewApplicant(applicant)}>
                        View Details
                      </button>
                      <a href={`mailto:${applicant.user.email}`} className="contact-btn">
                        Contact
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-filtered-applicants">
                  <p>No applicants found with the selected filter.</p>
                  <button onClick={() => setActiveFilter("all")} className="reset-filter-btn">
                    Show All Applicants
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="no-applicants">
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
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <h3>No Applicants Yet</h3>
            <p>This job hasn't received any applications yet.</p>
            <Link to="/dashboard" className="back-to-dashboard-btn">
              Back to Dashboard
            </Link>
          </div>
        )}
      </div>

      {/* Applicant Details Modal */}
      {showApplicantDetails && selectedApplicant && (
        <div className="applicant-details-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Applicant Details</h2>
              <button className="close-modal-btn" onClick={() => setShowApplicantDetails(false)}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="applicant-profile">
                <div className="applicant-header">
                  <div className="applicant-avatar large">
                    {selectedApplicant.user.firstName.charAt(0)}
                    {selectedApplicant.user.lastName.charAt(0)}
                  </div>
                  <div className="applicant-basic-info">
                    <h3>
                      {selectedApplicant.user.firstName} {selectedApplicant.user.lastName}
                    </h3>
                    <p className="applicant-email">
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
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                      {selectedApplicant.user.email}
                    </p>
                    <p className="applicant-phone">
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
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      {selectedApplicant.phone || "Not provided"}
                    </p>
                    <p className="applicant-location">
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
                      {selectedApplicant.user.location || "Location not specified"}
                    </p>
                  </div>
                  <div className="application-status-section">
                    <div className="status-label">Application Status</div>
                    <select
                      value={selectedApplicant.status}
                      onChange={(e) => handleStatusChange(selectedApplicant._id, e.target.value)}
                      className={`status-select large status-${selectedApplicant.status.toLowerCase()}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewing">Reviewing</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="interview">Interview</option>
                      <option value="selected">Selected</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <div className="applied-on">Applied on {formatDate(selectedApplicant.appliedAt)}</div>
                  </div>
                </div>

                <div className="applicant-details-sections">
                  <div className="details-section">
                    <h4>Professional Information</h4>
                    <div className="detail-item">
                      <div className="detail-label">Experience</div>
                      <div className="detail-value">{selectedApplicant.experience || "Not specified"}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Education</div>
                      <div className="detail-value">{selectedApplicant.education || "Not specified"}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Current Company</div>
                      <div className="detail-value">{selectedApplicant.currentCompany || "Not specified"}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Current Position</div>
                      <div className="detail-value">{selectedApplicant.currentPosition || "Not specified"}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Expected Salary</div>
                      <div className="detail-value">{selectedApplicant.expectedSalary || "Not specified"}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Available Start Date</div>
                      <div className="detail-value">
                        {selectedApplicant.availableStartDate
                          ? formatDate(selectedApplicant.availableStartDate)
                          : "Not specified"}
                      </div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Reference Contact</div>
                      <div className="detail-value">{selectedApplicant.referenceContact || "Not provided"}</div>
                    </div>
                  </div>

                  <div className="details-section">
                    <h4>Cover Letter</h4>
                    <div className="cover-letter">
                      {selectedApplicant.coverLetter ? (
                        <div className="cover-letter-content">
                          {selectedApplicant.coverLetter.split("\n").map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                          ))}
                        </div>
                      ) : (
                        <p className="no-content">No cover letter provided</p>
                      )}
                    </div>
                  </div>

                  {selectedApplicant.additionalInfo && (
                    <div className="details-section">
                      <h4>Additional Information</h4>
                      <div className="additional-info">
                        {selectedApplicant.additionalInfo.split("\n").map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="details-section">
                    <h4>Resume/CV</h4>
                    <div className="resume-link">
                      {selectedApplicant.resume ? (
                        <a
                          href={selectedApplicant.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="resume-btn"
                        >
                          View Resume/CV
                        </a>
                      ) : (
                        <p className="no-content">No resume provided</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="applicant-actions-footer">
                  <a href={`mailto:${selectedApplicant.user.email}`} className="contact-email-btn">
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
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    Email Candidate
                  </a>
                  <button className="schedule-interview-btn">
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
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    Schedule Interview
                  </button>
                  <button
                    className={`status-action-btn ${selectedApplicant.status === "selected" ? "selected" : ""}`}
                    onClick={() => handleStatusChange(selectedApplicant._id, "selected")}
                    disabled={selectedApplicant.status === "selected"}
                  >
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
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    {selectedApplicant.status === "selected" ? "Selected" : "Select Candidate"}
                  </button>
                  <button
                    className={`status-action-btn reject ${selectedApplicant.status === "rejected" ? "rejected" : ""}`}
                    onClick={() => handleStatusChange(selectedApplicant._id, "rejected")}
                    disabled={selectedApplicant.status === "rejected"}
                  >
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
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                      <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                    {selectedApplicant.status === "rejected" ? "Rejected" : "Reject Candidate"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default JobApplicantsPage
