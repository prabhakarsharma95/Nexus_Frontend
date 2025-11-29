"use client"

import { useState, useEffect, useContext } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { jobService, userService } from "../services/api"
import { AuthContext } from "../context/AuthContext"
import "../pages/styles/job-detail-page.css"

const JobDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentUser, isAuthenticated } = useContext(AuthContext)
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isSaved, setIsSaved] = useState(false)
  const [isApplying, setIsApplying] = useState(false)
  const [applicationData, setApplicationData] = useState({
    coverLetter: "",
    resume: "",
    phone: "",
    experience: "",
    education: "",
    currentCompany: "",
    currentPosition: "",
    expectedSalary: "",
    availableStartDate: "",
    referenceContact: "",
    additionalInfo: "",
  })
  const [applicationStatus, setApplicationStatus] = useState(null)
  const [hasApplied, setHasApplied] = useState(false)
  const [userApplication, setUserApplication] = useState(null)

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await jobService.getJobById(id)
        setJob(response.job)

        // Check if job is saved by current user
        if (isAuthenticated) {
          try {
            // Check if job is saved
            const savedJobsResponse = await userService.getSavedJobs()
            const savedJobIds = savedJobsResponse.savedJobs.map((job) => job._id)
            setIsSaved(savedJobIds.includes(id))

            // Check if user has already applied for this job
            const appliedJobsResponse = await userService.getAppliedJobs()
            const application = appliedJobsResponse.applications.find((app) => app.job._id === id)

            if (application) {
              setHasApplied(true)
              setUserApplication(application)
            }
          } catch (err) {
            console.error("Error checking saved/applied status:", err)
          }
        }
      } catch (err) {
        console.error("Error fetching job details:", err)
        setError(err.response?.data?.message || "Failed to load job details")
      } finally {
        setLoading(false)
      }
    }

    fetchJobDetails()
  }, [id, isAuthenticated])

  const handleSaveJob = async () => {
    if (!isAuthenticated) {
      // Redirect to login
      navigate("/login", { state: { from: `/jobs/${id}` } })
      return
    }

    try {
      if (isSaved) {
        await userService.unsaveJob(id)
        setIsSaved(false)
      } else {
        await userService.saveJob(id)
        setIsSaved(true)
      }
    } catch (err) {
      console.error("Error saving/unsaving job:", err)
    }
  }

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      // Redirect to login
      navigate("/login", { state: { from: `/jobs/${id}` } })
      return
    }

    // If user has already applied, show their application status
    if (hasApplied) {
      navigate("/applications")
      return
    }

    setIsApplying(true)
  }

  const handleApplicationChange = (e) => {
    const { name, value } = e.target
    setApplicationData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleApplicationSubmit = async (e) => {
    e.preventDefault()

    try {
      setApplicationStatus({ loading: true, error: null, success: false })

      // Add user information to application data
      const fullApplicationData = {
        ...applicationData,
        userId: currentUser.id,
        jobId: id,
        appliedAt: new Date().toISOString(),
      }

      const response = await jobService.applyForJob(id, fullApplicationData)

      setApplicationStatus({
        loading: false,
        error: null,
        success: true,
        message: "Your application has been submitted successfully!",
      })

      // Update application status
      setHasApplied(true)
      setUserApplication(response.application)

      // Reset form and close application form after delay
      setTimeout(() => {
        setApplicationData({
          coverLetter: "",
          resume: "",
          phone: "",
          experience: "",
          education: "",
          currentCompany: "",
          currentPosition: "",
          expectedSalary: "",
          availableStartDate: "",
          referenceContact: "",
          additionalInfo: "",
        })
        setIsApplying(false)
        setApplicationStatus(null)
      }, 3000)
    } catch (err) {
      console.error("Error submitting application:", err)
      setApplicationStatus({
        loading: false,
        error: err.response?.data?.message || "Failed to submit application",
        success: false,
      })
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading job details...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <Link to="/jobs" className="back-button">
          Back to Jobs
        </Link>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="not-found-container">
        <h2>Job Not Found</h2>
        <p>The job you're looking for doesn't exist or has been removed.</p>
        <Link to="/jobs" className="back-button">
          Browse Jobs
        </Link>
      </div>
    )
  }

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Check if application deadline has passed
  const isDeadlinePassed = job.applicationDeadline && new Date(job.applicationDeadline) < new Date()

  // Check if current user is the employer who posted this job
  const isEmployer = currentUser && job.employer && currentUser.id === job.employer._id

  // Get application status badge class
  const getStatusBadgeClass = (status) => {
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

  return (
    <main className="job-details-page">
      <div className="container">
        <div className="job-details-header">
          <Link to="/jobs" className="back-link">
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
            Back to Jobs
          </Link>

          <div className="job-actions">
            <button className={`save-job-btn ${isSaved ? "saved" : ""}`} onClick={handleSaveJob}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={isSaved ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
              {isSaved ? "Saved" : "Save Job"}
            </button>

            {!isEmployer && (
              <button
                className="share-job-btn"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                  alert("Job URL copied to clipboard!")
                }}
              >
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
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
                Share
              </button>
            )}
          </div>
        </div>

        <div className="job-details-content">
          <div className="job-main-content">
            <div className="job-header">
              <div className="company-logo">
                <img src={job.logo || "/placeholder.svg?height=80&width=80"} alt={`${job.company} logo`} />
              </div>

              <div className="job-title-info">
                <h1>{job.title}</h1>
                <div className="company-name">{job.company}</div>
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
            </div>

            <div className="job-cta">
              {!isEmployer && (
                <button
                  className={`apply-now-btn ${hasApplied ? "already-applied" : ""}`}
                  onClick={handleApplyClick}
                  disabled={isDeadlinePassed || job.status !== "active"}
                >
                  {isDeadlinePassed
                    ? "Application Closed"
                    : job.status !== "active"
                      ? "Position Filled"
                      : hasApplied
                        ? "View Application Status"
                        : "Apply Now"}
                </button>
              )}

              {isEmployer && (
                <Link to={`/edit-job/${job._id}`} className="edit-job-btn">
                  Edit Job
                </Link>
              )}

              {job.applicationDeadline && (
                <div className="application-deadline">
                  <span className="deadline-label">Application Deadline:</span>
                  <span className={`deadline-date ${isDeadlinePassed ? "passed" : ""}`}>
                    {formatDate(job.applicationDeadline)}
                    {isDeadlinePassed ? " (Closed)" : ""}
                  </span>
                </div>
              )}
            </div>

            {/* Show application status if user has applied */}
            {hasApplied && userApplication && (
              <div className="application-status-container">
                <h3>Your Application Status</h3>
                <div className="application-status-info">
                  <div className="status-item">
                    <span className="status-label">Applied On:</span>
                    <span className="status-value">{formatDate(userApplication.appliedAt)}</span>
                  </div>
                  <div className="status-item">
                    <span className="status-label">Current Status:</span>
                    <span className={getStatusBadgeClass(userApplication.status)}>{userApplication.status}</span>
                  </div>
                  <div className="status-item">
                    <span className="status-label">Last Updated:</span>
                    <span className="status-value">
                      {formatDate(userApplication.updatedAt || userApplication.appliedAt)}
                    </span>
                  </div>
                </div>
                <Link to="/applications" className="view-all-applications-btn">
                  View All My Applications
                </Link>
              </div>
            )}

            <div className="job-description">
              <h2>Job Description</h2>
              <div className="description-content">
                {job.description.split("\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="job-responsibilities">
              <h2>Responsibilities</h2>
              <div className="responsibilities-content">
                {job.responsibilities.split("\n").map((responsibility, index) => (
                  <p key={index}>{responsibility}</p>
                ))}
              </div>
            </div>

            <div className="job-requirements">
              <h2>Requirements</h2>
              <div className="requirements-content">
                {job.requirements.split("\n").map((requirement, index) => (
                  <p key={index}>{requirement}</p>
                ))}
              </div>
            </div>

            {job.benefits && job.benefits.length > 0 && (
              <div className="job-benefits">
                <h2>Benefits</h2>
                <ul className="benefits-list">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="benefit-item">
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
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="job-sidebar">
            <div className="job-summary">
              <h3>Job Summary</h3>
              <ul className="summary-list">
                <li className="summary-item">
                  <span className="item-label">Salary Range:</span>
                  <span className="item-value">
                    {job.salaryRange ||
                      `${job.salary.currency}${job.salary.min.toLocaleString()} - ${job.salary.currency}${job.salary.max.toLocaleString()}`}
                  </span>
                </li>
                <li className="summary-item">
                  <span className="item-label">Experience:</span>
                  <span className="item-value">{job.experience}</span>
                </li>
                <li className="summary-item">
                  <span className="item-label">Education:</span>
                  <span className="item-value">{job.education}</span>
                </li>
                <li className="summary-item">
                  <span className="item-label">Category:</span>
                  <span className="item-value">{job.category}</span>
                </li>
              </ul>
            </div>

            <div className="job-skills">
              <h3>Required Skills</h3>
              <div className="skills-list">
                {job.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {!isEmployer && !isDeadlinePassed && job.status === "active" && !hasApplied && (
              <div className="apply-sidebar-cta">
                <button className="apply-now-sidebar-btn" onClick={handleApplyClick}>
                  Apply for this position
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Application Form Modal */}
        {isApplying && (
          <div className="application-modal">
            <div className="application-modal-content">
              <div className="modal-header">
                <h2>Apply for {job.title}</h2>
                <button className="close-modal-btn" onClick={() => setIsApplying(false)}>
                  &times;
                </button>
              </div>

              <div className="modal-body">
                {applicationStatus?.success ? (
                  <div className="application-success">
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
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <h3>Application Submitted!</h3>
                    <p>{applicationStatus.message}</p>
                    <p className="success-note">You can track your application status in your dashboard.</p>
                  </div>
                ) : (
                  <form onSubmit={handleApplicationSubmit} className="application-form">
                    <div className="form-group">
                      <label htmlFor="resume">Resume/CV Link</label>
                      <input
                        type="text"
                        id="resume"
                        name="resume"
                        value={applicationData.resume}
                        onChange={handleApplicationChange}
                        placeholder="Link to your resume (Google Drive, Dropbox, etc.)"
                        required
                      />
                      <small>Please provide a link to your resume or CV</small>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={applicationData.phone}
                          onChange={handleApplicationChange}
                          placeholder="Your contact number"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="experience">Years of Experience</label>
                        <input
                          type="text"
                          id="experience"
                          name="experience"
                          value={applicationData.experience}
                          onChange={handleApplicationChange}
                          placeholder="e.g., 3 years"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="education">Highest Education</label>
                        <input
                          type="text"
                          id="education"
                          name="education"
                          value={applicationData.education}
                          onChange={handleApplicationChange}
                          placeholder="e.g., Bachelor's in Computer Science"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="expectedSalary">Expected Salary</label>
                        <input
                          type="text"
                          id="expectedSalary"
                          name="expectedSalary"
                          value={applicationData.expectedSalary}
                          onChange={handleApplicationChange}
                          placeholder="e.g., $60,000 per year"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="currentCompany">Current Company</label>
                        <input
                          type="text"
                          id="currentCompany"
                          name="currentCompany"
                          value={applicationData.currentCompany}
                          onChange={handleApplicationChange}
                          placeholder="Leave blank if not employed"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="currentPosition">Current Position</label>
                        <input
                          type="text"
                          id="currentPosition"
                          name="currentPosition"
                          value={applicationData.currentPosition}
                          onChange={handleApplicationChange}
                          placeholder="Leave blank if not employed"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="availableStartDate">Available Start Date</label>
                        <input
                          type="date"
                          id="availableStartDate"
                          name="availableStartDate"
                          value={applicationData.availableStartDate}
                          onChange={handleApplicationChange}
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="referenceContact">Reference Contact (Optional)</label>
                        <input
                          type="text"
                          id="referenceContact"
                          name="referenceContact"
                          value={applicationData.referenceContact}
                          onChange={handleApplicationChange}
                          placeholder="Name and contact of reference"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="coverLetter">Cover Letter</label>
                      <textarea
                        id="coverLetter"
                        name="coverLetter"
                        value={applicationData.coverLetter}
                        onChange={handleApplicationChange}
                        rows={6}
                        placeholder="Explain why you're a good fit for this position..."
                        required
                      ></textarea>
                    </div>

                    <div className="form-group">
                      <label htmlFor="additionalInfo">Additional Information (Optional)</label>
                      <textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        value={applicationData.additionalInfo}
                        onChange={handleApplicationChange}
                        rows={4}
                        placeholder="Any additional information you'd like to share..."
                      ></textarea>
                    </div>

                    {applicationStatus?.error && <div className="error-message">{applicationStatus.error}</div>}

                    <div className="form-actions">
                      <button type="button" className="cancel-btn" onClick={() => setIsApplying(false)}>
                        Cancel
                      </button>
                      <button type="submit" className="submit-btn" disabled={applicationStatus?.loading}>
                        {applicationStatus?.loading ? "Submitting..." : "Submit Application"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default JobDetailsPage
