"use client"

import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { userService, jobService } from "../services/api"
import PostJobForm from "../pages/PostJobForm"
import "../pages/styles/EmployerDashboard.css"

const EmployerDashboardPage = () => {
  const { currentUser } = useContext(AuthContext)
  const [profile, setProfile] = useState(null)
  const [postedJobs, setPostedJobs] = useState([])
  const [applicantStats, setApplicantStats] = useState({
    total: 0,
    pending: 0,
    reviewed: 0,
    interviewed: 0,
    hired: 0,
    rejected: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [isOpen, setIsOpen] = useState(false)
  const [recentApplicants, setRecentApplicants] = useState([])

  useEffect(() => {
    fetchDashboardData()
  }, [currentUser])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch user profile
      const profileResponse = await userService.getUserProfile()
      setProfile(profileResponse.user)

      // Fetch posted jobs
      const postedJobsResponse = await jobService.getEmployerJobs()
      setPostedJobs(postedJobsResponse.jobs)

      // Calculate applicant statistics
      let totalApplicants = 0
      let pendingCount = 0
      let reviewedCount = 0
      let interviewedCount = 0
      let hiredCount = 0
      let rejectedCount = 0
      const allApplicants = []

      postedJobsResponse.jobs.forEach((job) => {
        totalApplicants += job.applicants.length

        job.applicants.forEach((applicant) => {
          // Add job title to applicant for display
          const applicantWithJobInfo = {
            ...applicant,
            jobTitle: job.title,
            jobId: job._id,
          }

          allApplicants.push(applicantWithJobInfo)

          // Count by status
          switch (applicant.status) {
            case "pending":
              pendingCount++
              break
            case "reviewed":
              reviewedCount++
              break
            case "interviewed":
              interviewedCount++
              break
            case "hired":
              hiredCount++
              break
            case "rejected":
              rejectedCount++
              break
          }
        })
      })

      // Sort applicants by date (newest first) and take the 5 most recent
      allApplicants.sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt))
      setRecentApplicants(allApplicants.slice(0, 5))

      setApplicantStats({
        total: totalApplicants,
        pending: pendingCount,
        reviewed: reviewedCount,
        interviewed: interviewedCount,
        hired: hiredCount,
        rejected: rejectedCount,
      })
    } catch (err) {
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
      </div>
    )
  }

  return (
    <main className="employer-dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h1>Employer Dashboard</h1>
          <p>Welcome back, {currentUser.firstName}!</p>
          <button onClick={() => setIsOpen(true)} className="post-job-btn primary-btn">
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

        <div className="dashboard-tabs">
          <button
            className={`tab-button ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button className={`tab-button ${activeTab === "jobs" ? "active" : ""}`} onClick={() => setActiveTab("jobs")}>
            Posted Jobs
          </button>
          <button
            className={`tab-button ${activeTab === "applicants" ? "active" : ""}`}
            onClick={() => setActiveTab("applicants")}
          >
            Applicants
          </button>
          <button
            className={`tab-button ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            Company Profile
          </button>
        </div>

        <div className="dashboard-content">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="overview-tab">
              <div className="stats-cards">
                <div className="stats-card">
                  <div className="stats-icon jobs-icon">
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
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                  </div>
                  <div className="stats-content">
                    <h3>Active Jobs</h3>
                    <p className="stats-number">{postedJobs.filter((job) => job.status === "active").length}</p>
                  </div>
                </div>

                <div className="stats-card">
                  <div className="stats-icon applicants-icon">
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
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div className="stats-content">
                    <h3>Total Applicants</h3>
                    <p className="stats-number">{applicantStats.total}</p>
                  </div>
                </div>

                <div className="stats-card">
                  <div className="stats-icon pending-icon">
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
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div className="stats-content">
                    <h3>Pending Review</h3>
                    <p className="stats-number">{applicantStats.pending}</p>
                  </div>
                </div>

                <div className="stats-card">
                  <div className="stats-icon hired-icon">
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
                  <div className="stats-content">
                    <h3>Hired</h3>
                    <p className="stats-number">{applicantStats.hired}</p>
                  </div>
                </div>
              </div>

              <div className="dashboard-sections">
                <div className="recent-jobs-section">
                  <div className="section-header">
                    <h2>Recent Job Postings</h2>
                    <Link to="/manage-jobs" className="view-all-link">
                      View All
                    </Link>
                  </div>

                  {postedJobs.length > 0 ? (
                    <div className="recent-jobs-list">
                      {postedJobs.slice(0, 3).map((job) => (
                        <div key={job._id} className="job-item">
                          <div className="job-item-header">
                            <h3>{job.title}</h3>
                            <span className={`status-badge status-${job.status}`}>
                              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                            </span>
                          </div>
                          <div className="job-item-details">
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
                              <span className="job-date">
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
                                Posted {new Date(job.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="job-applicants">
                              <span className="applicant-count">
                                {job.applicants.length} Applicant{job.applicants.length !== 1 ? "s" : ""}
                              </span>
                            </div>
                          </div>
                          <div className="job-item-actions">
                            <Link to={`/job/${job._id}/applicants`} className="view-applicants-btn">
                              View Applicants
                            </Link>
                            <Link to={`/edit-job/${job._id}`} className="edit-job-btn">
                              Edit
                            </Link>
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

                <div className="recent-applicants-section">
                  <div className="section-header">
                    <h2>Recent Applicants</h2>
                    <Link to="/all-applicants" className="view-all-link">
                      View All
                    </Link>
                  </div>

                  {recentApplicants.length > 0 ? (
                    <div className="recent-applicants-list">
                      {recentApplicants.map((applicant, index) => (
                        <div key={index} className="applicant-item">
                          <div className="applicant-info">
                            <div className="applicant-avatar">
                              {applicant.user.firstName.charAt(0)}
                              {applicant.user.lastName.charAt(0)}
                            </div>
                            <div className="applicant-details">
                              <h4>
                                {applicant.user.firstName} {applicant.user.lastName}
                              </h4>
                              <p>Applied for: {applicant.jobTitle}</p>
                              <span className="application-date">
                                {new Date(applicant.appliedAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="applicant-status">
                            <span className={`status-badge status-${applicant.status}`}>
                              {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                            </span>
                            <Link to={`/job/${applicant.jobId}/applicants`} className="view-application-btn">
                              View
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <p>No applications received yet.</p>
                      {postedJobs.length === 0 ? (
                        <button onClick={() => setIsOpen(true)} className="cta-button">
                          Post a Job
                        </button>
                      ) : (
                        <p>Your job postings are waiting for applicants.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Posted Jobs Tab */}
          {activeTab === "jobs" && (
            <div className="jobs-tab">
              <div className="tab-header">
                <h2>Manage Job Postings</h2>
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
                <div className="jobs-list">
                  <div className="jobs-list-header">
                    <div className="job-col job-title-col">Job Title</div>
                    <div className="job-col job-stats-col">Statistics</div>
                    <div className="job-col job-date-col">Posted Date</div>
                    <div className="job-col job-status-col">Status</div>
                    <div className="job-col job-actions-col">Actions</div>
                  </div>

                  {postedJobs.map((job) => (
                    <div key={job._id} className="job-row">
                      <div className="job-col job-title-col">
                        <h3>{job.title}</h3>
                        <p>
                          {job.location} • {job.type}
                        </p>
                      </div>

                      <div className="job-col job-stats-col">
                        <div className="job-stat">
                          <span className="stat-label">Applicants:</span>
                          <span className="stat-value">{job.applicants.length}</span>
                        </div>
                        <div className="job-stat">
                          <span className="stat-label">Views:</span>
                          <span className="stat-value">{job.views || 0}</span>
                        </div>
                      </div>

                      <div className="job-col job-date-col">
                        <div className="posted-date">{new Date(job.createdAt).toLocaleDateString()}</div>
                        <div className="deadline-date">
                          Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="job-col job-status-col">
                        <select
                          className={`status-select status-${job.status}`}
                          value={job.status}
                          onChange={async (e) => {
                            try {
                              await jobService.updateJob(job._id, { status: e.target.value })
                              // Update local state
                              setPostedJobs(
                                postedJobs.map((j) => (j._id === job._id ? { ...j, status: e.target.value } : j)),
                              )
                            } catch (err) {
                              console.error("Error updating job status:", err)
                              alert("Failed to update job status")
                            }
                          }}
                        >
                          <option value="active">Active</option>
                          <option value="closed">Closed</option>
                          <option value="draft">Draft</option>
                        </select>
                      </div>

                      <div className="job-col job-actions-col">
                        <div className="job-actions">
                          <Link to={`/job/${job._id}/applicants`} className="view-applicants-btn">
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
                              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                              <circle cx="9" cy="7" r="4"></circle>
                              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                            Applicants
                          </Link>
                          <Link to={`/edit-job/${job._id}`} className="edit-job-btn">
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
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
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
                                  alert("Failed to delete job")
                                }
                              }
                            }}
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
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              <line x1="10" y1="11" x2="10" y2="17"></line>
                              <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                            Delete
                          </button>
                        </div>
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

          {/* Applicants Tab */}
          {activeTab === "applicants" && (
            <div className="applicants-tab">
              <h2>All Applicants</h2>

              {applicantStats.total > 0 ? (
                <>
                  <div className="applicant-filters">
                    <div className="filter-group">
                      <label htmlFor="status-filter">Filter by Status</label>
                      <select id="status-filter" className="status-filter">
                        <option value="">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="interviewed">Interviewed</option>
                        <option value="hired">Hired</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>

                    <div className="filter-group">
                      <label htmlFor="job-filter">Filter by Job</label>
                      <select id="job-filter" className="job-filter">
                        <option value="">All Jobs</option>
                        {postedJobs.map((job) => (
                          <option key={job._id} value={job._id}>
                            {job.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="applicants-list">
                    {/* This would be populated with filtered applicants */}
                    <p>Showing all applicants. Use the filters above to narrow your search.</p>

                    {/* Placeholder for applicant list that would be implemented with actual data */}
                    <div className="applicant-list-placeholder">
                      <p>
                        The full applicant management interface would be implemented here, showing all applicants across
                        jobs with filtering and sorting options.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="empty-state">
                  <p>You haven't received any applications yet.</p>
                  {postedJobs.length === 0 ? (
                    <button onClick={() => setIsOpen(true)} className="cta-button">
                      Post a Job to Receive Applications
                    </button>
                  ) : (
                    <p>Your job postings are waiting for applicants.</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Company Profile Tab */}
          {activeTab === "profile" && (
            <div className="profile-tab">
              <h2>Company Profile</h2>
              <div className="profile-card">
                <div className="profile-header">
                  <div className="company-logo-placeholder">
                    {profile?.company ? profile.company.charAt(0) : currentUser.firstName.charAt(0)}
                  </div>
                  <div className="profile-info">
                    <h3>{profile?.company || "Your Company"}</h3>
                    <p className="profile-role">Employer Account</p>
                    <p className="profile-email">{currentUser.email}</p>
                  </div>
                </div>

                <div className="profile-details">
                  <div className="profile-section">
                    <h4>Company Information</h4>
                    <div className="profile-field">
                      <span className="field-label">Company Name:</span>
                      <span className="field-value">{profile?.company || "Not specified"}</span>
                    </div>
                    <div className="profile-field">
                      <span className="field-label">Industry:</span>
                      <span className="field-value">{profile?.industry || "Not specified"}</span>
                    </div>
                    <div className="profile-field">
                      <span className="field-label">Company Size:</span>
                      <span className="field-value">{profile?.companySize || "Not specified"}</span>
                    </div>
                    <div className="profile-field">
                      <span className="field-label">Location:</span>
                      <span className="field-value">{profile?.location || "Not specified"}</span>
                    </div>
                    <div className="profile-field">
                      <span className="field-label">Website:</span>
                      <span className="field-value">
                        {profile?.website ? (
                          <a href={profile.website} target="_blank" rel="noopener noreferrer">
                            {profile.website}
                          </a>
                        ) : (
                          "Not specified"
                        )}
                      </span>
                    </div>
                    <div className="profile-field">
                      <span className="field-label">About:</span>
                      <span className="field-value">{profile?.about || "Not specified"}</span>
                    </div>
                  </div>
                </div>

                <div className="profile-actions">
                  <Link to="/edit-company-profile" className="edit-profile-btn">
                    Edit Company Profile
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

export default EmployerDashboardPage
