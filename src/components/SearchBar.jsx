"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const SearchBar = () => {
  const [jobQuery, setJobQuery] = useState("")
  const [locationQuery, setLocationQuery] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    // Build query string
    const queryParams = new URLSearchParams()
    if (jobQuery) queryParams.set("q", jobQuery)
    if (locationQuery) queryParams.set("location", locationQuery)

    // Navigate to jobs page with search parameters
    navigate(`/jobs?${queryParams.toString()}`)
  }

  return (
    <section className="search-section">
      <div className="container">
        <div className="search-container">
          <h2 className="search-title">Find Your Dream Job</h2>
          <p className="search-subtitle">Search thousands of jobs from top employers</p>
          <form className="search-form" onSubmit={handleSubmit}>
            <div className="search-input-group">
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
                className="search-icon"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                placeholder="Job title, skills, or company"
                className="search-input"
                value={jobQuery}
                onChange={(e) => setJobQuery(e.target.value)}
              />
            </div>
            <div className="search-input-group">
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
                className="search-icon"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <input
                type="text"
                placeholder="City, state, or remote"
                className="search-input"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
              />
            </div>
            <button type="submit" className="search-button">
              Search Jobs
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default SearchBar
