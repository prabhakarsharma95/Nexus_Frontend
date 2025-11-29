"use client"

import { useState, useEffect } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { jobService } from "../services/api"
import SearchBar from "../components/SearchBar"

const JobsPage = () => {
  const [searchParams] = useSearchParams()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    type: searchParams.get("type") || "",
    location: searchParams.get("location") || "",
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

  useEffect(() => {
    // Update filters from URL params
    const category = searchParams.get("category")
    const type = searchParams.get("type")
    const query = searchParams.get("q")
    const location = searchParams.get("location")

    const updatedFilters = { ...filters }
    if (category) updatedFilters.category = category
    if (type) updatedFilters.type = type
    if (query) updatedFilters.search = query
    if (location) updatedFilters.location = location

    setFilters(updatedFilters)
  }, [searchParams])

  useEffect(() => {
    fetchJobs()
  }, [filters])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      setError(null)

      // Prepare query parameters for API
      const queryParams = {
        page: filters.page,
        limit: filters.limit,
        sort: filters.sort,
      }

      // Add optional filters if they exist
      if (filters.search) queryParams.search = filters.search
      if (filters.category) queryParams.category = filters.category
      if (filters.type) queryParams.type = filters.type
      if (filters.location) queryParams.location = filters.location
      if (filters.experience) queryParams.experience = filters.experience
      if (filters.salary) queryParams.salary = filters.salary

      // Fetch jobs from API
      const response = await jobService.getAllJobs(queryParams)

      setJobs(response.jobs)
      setPagination({
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        totalJobs: response.totalJobs,
      })
    } catch (err) {
      console.error("Error fetching jobs:", err)
      setError("Failed to load jobs. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters({
      ...filters,
      [name]: value,
      page: 1, // Reset to first page when filter changes
    })
  }

  const applyFilters = () => {
    fetchJobs()
  }

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return

    setFilters({
      ...filters,
      page: newPage,
    })
  }

  // Format date to relative time (e.g., "2 days ago")
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return "Today"
    } else if (diffDays === 1) {
      return "Yesterday"
    } else {
      return `${diffDays} days ago`
    }
  }

  return (
    <main className="jobs-page">
      <SearchBar />

      <section className="jobs-section">
        <div className="container">
          <div className="jobs-header">
            <h1 className="page-title">Job Listings</h1>
            <p className="jobs-count">{pagination.totalJobs} jobs found</p>
          </div>

          <div className="jobs-container">
            <div className="filters-sidebar">
              <h3>Filter Jobs</h3>

              <div className="filter-group">
                <label htmlFor="category">Category</label>
                <select id="category" name="category" value={filters.category} onChange={handleFilterChange}>
                  <option value="">All Categories</option>
                  <option value="IT & Software">IT & Software</option>
                  <option value="Finance & Accounting">Finance & Accounting</option>
                  <option value="Marketing & Sales">Marketing & Sales</option>
                  <option value="Healthcare & Medical">Healthcare & Medical</option>
                  <option value="Engineering & Construction">Engineering & Construction</option>
                  <option value="Administrative & Clerical">Administrative & Clerical</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Education & Training">Education & Training</option>
                  <option value="Legal">Legal</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="type">Job Type</label>
                <select id="type" name="type" value={filters.type} onChange={handleFilterChange}>
                  <option value="">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Remote">Remote</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="City, state, or remote"
                  value={filters.location}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="filter-group">
                <label htmlFor="experience">Experience Level</label>
                <select id="experience" name="experience" value={filters.experience} onChange={handleFilterChange}>
                  <option value="">All Levels</option>
                  <option value="0-1 years">Entry Level (0-1 years)</option>
                  <option value="1-2 years">Junior (1-2 years)</option>
                  <option value="2-4 years">Mid Level (2-4 years)</option>
                  <option value="3-5 years">Senior (3-5 years)</option>
                  <option value="5+ years">Expert (5+ years)</option>
                  <option value="7+ years">Lead (7+ years)</option>
                  <option value="10+ years">Executive (10+ years)</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="salary">Salary Range</label>
                <select id="salary" name="salary" value={filters.salary} onChange={handleFilterChange}>
                  <option value="">All Ranges</option>
                  <option value="0-40000">Under $40k</option>
                  <option value="40000-80000">$40k - $80k</option>
                  <option value="80000-120000">$80k - $120k</option>
                  <option value="120000-160000">$120k - $160k</option>
                  <option value="160000-200000">$160k - $200k</option>
                  <option value="200000-">$200k+</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="sort">Sort By</label>
                <select id="sort" name="sort" value={filters.sort} onChange={handleFilterChange}>
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="salary-high-to-low">Salary: High to Low</option>
                  <option value="salary-low-to-high">Salary: Low to High</option>
                </select>
              </div>

              <button className="apply-filters-btn" onClick={applyFilters}>
                Apply Filters
              </button>

              <button
                className="clear-filters-btn"
                onClick={() => {
                  setFilters({
                    category: "",
                    type: "",
                    location: "",
                    experience: "",
                    salary: "",
                    page: 1,
                    limit: 10,
                    sort: "newest",
                  })
                }}
              >
                Clear Filters
              </button>
            </div>

            <div className="jobs-list">
              {loading ? (
                <div className="loading-jobs">
                  <div className="loading-spinner"></div>
                  <p>Loading jobs...</p>
                </div>
              ) : error ? (
                <div className="error-container">
                  <h3>Error</h3>
                  <p>{error}</p>
                  <button onClick={fetchJobs} className="retry-button">
                    Try Again
                  </button>
                </div>
              ) : jobs.length > 0 ? (
                <>
                  {jobs.map((job) => (
                    <div className="job-card" key={job._id}>
                      <div className="job-card-header">
                        <div className="company-logo">
                          <img src={job.logo || "/placeholder.svg?height=60&width=60"} alt={`${job.company} logo`} />
                        </div>
                        <div className="job-info">
                          <h3 className="job-title">
                            <Link to={`/jobs/${job._id}`}>{job.title}</Link>
                          </h3>
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
                            <span className="job-salary">
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
                                <line x1="12" y1="1" x2="12" y2="23"></line>
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                              </svg>
                              {job.salaryRange ||
                                `${job.salary.currency}${job.salary.min.toLocaleString()} - ${job.salary.currency}${job.salary.max.toLocaleString()}`}
                            </span>
                          </div>
                        </div>
                        <div className="job-date">
                          <span className="posted-date">{formatDate(job.createdAt)}</span>
                        </div>
                      </div>
                      <div className="job-card-body">
                        <p className="job-description">
                          {job.description.length > 200 ? `${job.description.substring(0, 200)}...` : job.description}
                        </p>
                      </div>
                      <div className="job-card-footer">
                        <div className="job-tags">
                          <span className="job-tag">{job.category}</span>
                          <span className="job-tag">{job.experience}</span>
                          {job.skills &&
                            job.skills.slice(0, 3).map((skill, index) => (
                              <span key={index} className="job-tag skill-tag">
                                {skill}
                              </span>
                            ))}
                          {job.skills && job.skills.length > 3 && (
                            <span className="job-tag more-tag">+{job.skills.length - 3} more</span>
                          )}
                        </div>
                        <Link to={`/jobs/${job._id}`} className="apply-btn">
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}

                  {/* Pagination */}
                  {pagination.totalPages > 1 && (
                    <div className="pagination">
                      <button
                        className="pagination-btn prev"
                        disabled={pagination.currentPage === 1}
                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                      >
                        Previous
                      </button>

                      {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                        .filter(
                          (page) =>
                            page === 1 ||
                            page === pagination.totalPages ||
                            Math.abs(page - pagination.currentPage) <= 1,
                        )
                        .map((page, index, array) => {
                          // Add ellipsis
                          if (index > 0 && array[index - 1] !== page - 1) {
                            return (
                              <span key={`ellipsis-${page}`} className="pagination-ellipsis">
                                ...
                              </span>
                            )
                          }

                          return (
                            <button
                              key={page}
                              className={`pagination-btn page-num ${pagination.currentPage === page ? "active" : ""}`}
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </button>
                          )
                        })}

                      <button
                        className="pagination-btn next"
                        disabled={pagination.currentPage === pagination.totalPages}
                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="no-jobs-found">
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
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <h3>No jobs found</h3>
                  <p>Try adjusting your search filters or try a different search term.</p>
                  <button
                    className="reset-search-btn"
                    onClick={() => {
                      setFilters({
                        category: "",
                        type: "",
                        location: "",
                        experience: "",
                        salary: "",
                        page: 1,
                        limit: 10,
                        sort: "newest",
                      })
                    }}
                  >
                    Reset Search
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default JobsPage
