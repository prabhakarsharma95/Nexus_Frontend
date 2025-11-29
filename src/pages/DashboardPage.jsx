"use client"

import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { userService, jobService } from "../services/api"
import PostJobForm from "../pages/PostJobForm"

const DashboardPage = () => {
  const { currentUser } = useContext(AuthContext)
  const [profile, setProfile] = useState(null)
  const [savedJobs, setSavedJobs] = useState([])
  const [appliedJobs, setAppliedJobs] = useState([])
  const [postedJobs, setPostedJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    fetchDashboardData()
  }, [currentUser])

  // Safe date formatter function to handle undefined dates
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"

    try {
      return new Date(dateString).toLocaleDateString()
    } catch (error) {
      console.error("Error formatting date:", error)
      return "Invalid date"
    }
  }

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch user profile
      const profileResponse = await userService.getUserProfile()
      setProfile(profileResponse.user)

      if (currentUser.role === "job-seeker") {
        // Fetch saved jobs
        const savedJobsResponse = await userService.getSavedJobs()
        setSavedJobs(savedJobsResponse.savedJobs || [])

        // Fetch applied jobs
        const appliedJobsResponse = await userService.getAppliedJobs()
        setAppliedJobs(appliedJobsResponse.applications || [])
      } else if (currentUser.role === "employer") {
        // Fetch posted jobs
        const postedJobsResponse = await jobService.getEmployerJobs()
        setPostedJobs(postedJobsResponse.jobs || [])
      }
    } catch (err) {
      console.error("Dashboard data fetch error:", err)
      setError(err.response?.data?.error || "Failed to fetch dashboard data")
    } finally {
      setLoading(false)
    }
  }

  // Handle successful job posting
  const handleJobPostSuccess = (newJob) => {
    setIsOpen(false)
    // Add the new job to the posted jobs list
    setPostedJobs((prevJobs) => [newJob, ...prevJobs])
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={fetchDashboardData} className="retry-button">
          Retry
        </button>
      </div>
    )
  }

  return (
    <main className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Welcome back, {currentUser.firstName}!</p>
        </div>

        <div className="dashboard-tabs">
          <button
            className={`tab-button ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          {currentUser.role === "job-seeker" && (
            <>
              <button
                className={`tab-button ${activeTab === "saved" ? "active" : ""}`}
                onClick={() => setActiveTab("saved")}
              >
                Saved Jobs
              </button>
              <button
                className={`tab-button ${activeTab === "applied" ? "active" : ""}`}
                onClick={() => setActiveTab("applied")}
              >
                Applied Jobs
              </button>
            </>
          )}
          {currentUser.role === "employer" && (
            <button
              className={`tab-button ${activeTab === "posted" ? "active" : ""}`}
              onClick={() => setActiveTab("posted")}
            >
              Posted Jobs
            </button>
          )}
          <button
            className={`tab-button ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
        </div>

        <div className="dashboard-content">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="overview-tab">
              <div className="dashboard-cards">
                {currentUser.role === "job-seeker" && (
                  <>
                    <div className="dashboard-card">
                      <div className="card-icon saved-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                      </div>
                      <div className="card-content">
                        <h3>Saved Jobs</h3>
                        <p className="card-count">{savedJobs.length}</p>
                        <Link to="/saved-jobs" className="card-link">
                          View All
                        </Link>
                      </div>
                    </div>
                    <div className="dashboard-card">
                      <div className="card-icon applied-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
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
                      </div>
                      <div className="card-content">
                        <h3>Applied Jobs</h3>
                        <p className="card-count">{appliedJobs.length}</p>
                        <Link to="/applied-jobs" className="card-link">
                          View All
                        </Link>
                      </div>
                    </div>
                  </>
                )}
                {currentUser.role === "employer" && (
                  <>
                    <div className="dashboard-card">
                      <div className="card-icon posted-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                      </div>
                      <div className="card-content">
                        <h3>Posted Jobs</h3>
                        <p className="card-count">{postedJobs.length}</p>
                        <Link to="/manage-jobs" className="card-link">
                          View All
                        </Link>
                      </div>
                    </div>
                    <div className="dashboard-card">
                      <div className="card-icon new-job-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="16"></line>
                          <line x1="8" y1="12" x2="16" y2="12"></line>
                        </svg>
                      </div>
                      <div className="card-content">
                        <h3>Post New Job</h3>
                        <p className="card-description">Create a new job listing</p>
                        <button onClick={() => setIsOpen(true)} className="card-link">
                          Post Job
                        </button>
                      </div>
                    </div>
                  </>
                )}
                <div className="dashboard-card">
                  <div className="card-icon profile-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div className="card-content">
                    <h3>Profile</h3>
                    <p className="card-description">Update your profile information</p>
                    <Link to="/profile" className="card-link">
                      Edit Profile
                    </Link>
                  </div>
                </div>
              </div>

              {/* Recent Activity Section */}
              <div className="recent-activity">
                <h2>Recent Activity</h2>
                {currentUser.role === "job-seeker" && (
                  <div className="activity-list">
                    {appliedJobs.length > 0 ? (
                      <div className="recent-applications">
                        <h3>Recent Applications</h3>
                        <ul className="application-list">
                          {appliedJobs.slice(0, 3).map((application) => (
                            <li key={application._id} className="application-item">
                              <div className="application-details">
                                <h4>{application.job?.title || "Job Title Unavailable"}</h4>
                                <p>{application.job?.company || "Company Unavailable"}</p>
                                <div className="application-meta">
                                  <span className="application-date">
                                    Applied on {formatDate(application.appliedAt)}
                                  </span>
                                  <span className={`application-status status-${application.status}`}>
                                    {application.status?.charAt(0).toUpperCase() + application.status?.slice(1) ||
                                      "Pending"}
                                  </span>
                                </div>
                              </div>
                              <Link to={`/jobs/${application.job?._id}`} className="view-job-link">
                                View Job
                              </Link>
                            </li>
                          ))}
                        </ul>
                        {appliedJobs.length > 3 && (
                          <Link to="/applied-jobs" className="view-all-link">
                            View All Applications
                          </Link>
                        )}
                      </div>
                    ) : (
                      <div className="empty-state">
                        <p>You haven't applied to any jobs yet.</p>
                        <Link to="/jobs" className="cta-button">
                          Browse Jobs
                        </Link>
                      </div>
                    )}
                  </div>
                )}
                {currentUser.role === "employer" && (
                  <div className="activity-list">
                    {postedJobs.length > 0 ? (
                      <div className="recent-jobs">
                        <h3>Recent Job Postings</h3>
                        <ul className="job-list">
                          {postedJobs.slice(0, 3).map((job) => (
                            <li key={job._id} className="job-item">
                              <div className="job-details">
                                <h4>{job.title}</h4>
                                <p>{job.location}</p>
                                <div className="job-meta">
                                  <span className="job-date">Posted on {formatDate(job.createdAt)}</span>
                                  <span className={`job-status status-${job.status}`}>
                                    {job.status?.charAt(0).toUpperCase() + job.status?.slice(1) || "Active"}
                                  </span>
                                </div>
                              </div>
                              <div className="job-actions">
                                <Link to={`/job/${job._id}/applicants`} className="applicants-link">
                                  {job.applicants?.length || 0} Applicant(s)
                                </Link>
                                <Link to={`/edit-job/${job._id}`} className="edit-job-link">
                                  Edit
                                </Link>
                              </div>
                            </li>
                          ))}
                        </ul>
                        {postedJobs.length > 3 && (
                          <Link to="/manage-jobs" className="view-all-link">
                            View All Jobs
                          </Link>
                        )}
                      </div>
                    ) : (
                      <div className="empty-state">
                        <p>You haven't posted any jobs yet.</p>
                        <button onClick={() => setIsOpen(true)} className="cta-button">
                          Post a Job
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Saved Jobs Tab */}
          {activeTab === "saved" && (
            <div className="saved-jobs-tab">
              <h2>Saved Jobs</h2>
              {savedJobs.length > 0 ? (
                <div className="saved-jobs-list">
                  {savedJobs.map((job) => (
                    <div key={job._id} className="saved-job-card">
                      <div className="job-card-header">
                        <div className="company-logo">
                          <img
                            src={job.logo || "/placeholder.svg?height=60&width=60"}
                            alt={`${job.company || "Company"} logo`}
                          />
                        </div>
                        <div className="job-info">
                          <h3 className="job-title">{job.title || "Job Title Unavailable"}</h3>
                          <div className="company-name">{job.company || "Company Unavailable"}</div>
                          <div className="job-meta">
                            <span className="job-location">{job.location || "Location Unavailable"}</span>
                            <span className="job-type">{job.type || "Job Type Unavailable"}</span>
                          </div>
                        </div>
                      </div>
                      <div className="job-card-actions">
                        <Link to={`/jobs/${job._id}`} className="view-job-btn">
                          View Details
                        </Link>
                        <button
                          className="unsave-job-btn"
                          onClick={async () => {
                            try {
                              await userService.unsaveJob(job._id)
                              setSavedJobs(savedJobs.filter((j) => j._id !== job._id))
                            } catch (err) {
                              console.error("Error unsaving job:", err)
                            }
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                          </svg>
                          Unsave
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>You haven't saved any jobs yet.</p>
                  <Link to="/jobs" className="cta-button">
                    Browse Jobs
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Applied Jobs Tab */}
          {activeTab === "applied" && (
            <div className="applied-jobs-tab">
              <h2>Applied Jobs</h2>
              {appliedJobs.length > 0 ? (
                <div className="applied-jobs-list">
                  {appliedJobs.map((application) => (
                    <div key={application._id} className="applied-job-card">
                      <div className="job-card-header">
                        <div className="company-logo">
                          <img
                            src={application.job?.logo || "/placeholder.svg?height=60&width=60"}
                            alt={`${application.job?.company || "Company"} logo`}
                          />
                        </div>
                        <div className="job-info">
                          <h3 className="job-title">{application.job?.title || "Job Title Unavailable"}</h3>
                          <div className="company-name">{application.job?.company || "Company Unavailable"}</div>
                          <div className="job-meta">
                            <span className="job-location">{application.job?.location || "Location Unavailable"}</span>
                            <span className="job-type">{application.job?.type || "Job Type Unavailable"}</span>
                          </div>
                        </div>
                        <div className="application-status">
                          <span className={`status-badge status-${application.status || "pending"}`}>
                            {application.status?.charAt(0).toUpperCase() + application.status?.slice(1) || "Pending"}
                          </span>
                          <span className="application-date">Applied on {formatDate(application.appliedAt)}</span>
                        </div>
                      </div>
                      <div className="job-card-actions">
                        <Link to={`/jobs/${application.job?._id}`} className="view-job-btn">
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>You haven't applied to any jobs yet.</p>
                  <Link to="/jobs" className="cta-button">
                    Browse Jobs
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Posted Jobs Tab */}
          {activeTab === "posted" && (
            <div className="posted-jobs-tab">
              <div className="tab-header">
                <h2>Posted Jobs</h2>
                <button onClick={() => setIsOpen(true)} className="post-job-btn">
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
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                  Post New Job
                </button>
              </div>
              {postedJobs.length > 0 ? (
                <div className="posted-jobs-list">
                  {postedJobs.map((job) => (
                    <div key={job._id} className="posted-job-card">
                      <div className="job-card-header">
                        <div className="job-info">
                          <h3 className="job-title">{job.title}</h3>
                          <div className="job-meta">
                            <span className="job-location">{job.location || "Location Unavailable"}</span>
                            <span className="job-type">{job.type || "Job Type Unavailable"}</span>
                            <span className={`job-status status-${job.status || "active"}`}>
                              {job.status?.charAt(0).toUpperCase() + job.status?.slice(1) || "Active"}
                            </span>
                          </div>
                        </div>
                        <div className="job-stats">
                          <div className="stat-item">
                            <span className="stat-label">Applicants:</span>
                            <span className="stat-value">{job.applicants?.length || 0}</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-label">Posted:</span>
                            <span className="stat-value">{formatDate(job.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="job-card-actions">
                        <Link to={`/job/${job._id}/applicants`} className="view-applicants-btn">
                          View Applicants
                        </Link>
                        <Link to={`/edit-job/${job._id}`} className="edit-job-btn">
                          Edit
                        </Link>
                        <button
                          className="delete-job-btn"
                          onClick={async () => {
                            if (window.confirm("Are you sure you want to delete this job?")) {
                              try {
                                await jobService.deleteJob(job._id)
                                setPostedJobs(postedJobs.filter((j) => j._id !== job._id))
                              } catch (err) {
                                console.error("Error deleting job:", err)
                              }
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>You haven't posted any jobs yet.</p>
                  <button onClick={() => setIsOpen(true)} className="cta-button">
                    Post Your First Job
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="profile-tab">
              <h2>Profile Information</h2>
              <div className="profile-card">
                <div className="profile-header">
                  <div className="profile-avatar">
                    {currentUser.firstName?.charAt(0) || ""}
                    {currentUser.lastName?.charAt(0) || ""}
                  </div>
                  <div className="profile-info">
                    <h3>
                      {currentUser.firstName || ""} {currentUser.lastName || ""}
                    </h3>
                    <p className="profile-role">{currentUser.role === "job-seeker" ? "Job Seeker" : "Employer"}</p>
                    <p className="profile-email">{currentUser.email || ""}</p>
                  </div>
                </div>
                <div className="profile-details">
                  <div className="profile-section">
                    <h4>Personal Information</h4>
                    <div className="profile-field">
                      <span className="field-label">Location:</span>
                      <span className="field-value">{profile?.location || "Not specified"}</span>
                    </div>
                    {currentUser.role === "job-seeker" && (
                      <>
                        <div className="profile-field">
                          <span className="field-label">Position:</span>
                          <span className="field-value">{profile?.position || "Not specified"}</span>
                        </div>
                        <div className="profile-field">
                          <span className="field-label">Skills:</span>
                          <div className="field-value">
                            {profile?.skills && profile.skills.length > 0 ? (
                              <div className="skills-list">
                                {profile.skills.map((skill, index) => (
                                  <span key={index} className="skill-tag">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              "Not specified"
                            )}
                          </div>
                        </div>
                      </>
                    )}
                    {currentUser.role === "employer" && (
                      <div className="profile-field">
                        <span className="field-label">Company:</span>
                        <span className="field-value">{profile?.company || "Not specified"}</span>
                      </div>
                    )}
                    <div className="profile-field">
                      <span className="field-label">Bio:</span>
                      <span className="field-value">{profile?.bio || "Not specified"}</span>
                    </div>
                  </div>
                </div>
                <div className="profile-actions">
                  <Link to="/profile" className="edit-profile-btn">
                    Edit Profile
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Job Posting Modal */}
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Post a New Job</h2>
              <button onClick={() => setIsOpen(false)} className="close-button">
                &times;
              </button>
            </div>
            <div className="modal-body">
              <PostJobForm onSuccess={handleJobPostSuccess} />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default DashboardPage
