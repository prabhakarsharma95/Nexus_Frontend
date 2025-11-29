"use client"

import { useState, useContext, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

import logo from "../assets/images/logo.jpg"

const Navbar = ({ openLoginModal, openSignupModal }) => {
  const { currentUser, logout } = useContext(AuthContext)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null)
  const navRef = useRef(null)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const toggleDropdown = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(dropdown)
    }
  }
 

  const toggleMobileDropdown = (dropdown) => {
    if (activeMobileDropdown === dropdown) {
      setActiveMobileDropdown(null)
    } else {
      setActiveMobileDropdown(dropdown)
    }
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <nav className="navbar" ref={navRef}>
      <div className="container">
        <div className="nav-container">
          {/* Logo */}
          <Link to="/" className="logo">
            <img src={logo} alt="Nexus HR Logo" />
          </Link>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            {/* Home */}
            <div className="nav-item">
              <Link to="/" className="nav-button">
                Home
              </Link>
            </div>

            {/* Jobs Dropdown */}
            <div className="nav-item">
              <button
                className={`nav-button ${activeDropdown === "jobs" ? "active" : ""}`}
                onClick={() => toggleDropdown("jobs")}
              >
                Jobs
                <svg
                  className="chevron-down"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div className={`dropdown ${activeDropdown === "jobs" ? "active" : ""}`} id="jobs-dropdown">
                <ul className="dropdown-list">
                  <li>
                    <Link to="/jobs?category=IT & Software" className="dropdown-link">
                      Work From Home Jobs
                    </Link>
                  </li>
                  <li>
                    <Link to="/jobs?category=Finance & Accounting" className="dropdown-link">
                      Part Time Jobs
                    </Link>
                  </li>
                  <li>
                    <Link to="/jobs?category=Marketing & Sales" className="dropdown-link">
                      Freshers Jobs
                    </Link>
                  </li>
                  <li>
                    <Link to="/jobs?category=Healthcare & Medical" className="dropdown-link">
                     Jobs For Women
                    </Link>
                  </li>
                  <li>
                    <Link to="/jobs?category=Engineering & Construction" className="dropdown-link">
                      Full Time Jobs
                    </Link>
                  </li>
                  <li>
                    <Link to="/jobs?category=Administrative & Clerical" className="dropdown-link">
                      Night Shift Jobs
                    </Link>
                  </li>
                  <li>
                    <Link to="/jobs?type=Remote" className="dropdown-link">
                      Remote Jobs
                    </Link>
                  </li>
                  <li>
                    <Link to="/jobs" className="dropdown-link">
                      Browse All Jobs
                    </Link>
                  </li>
                </ul>
                <ul className="dropdown-list">
                  <li>
                    <Link to="/jobs?category=IT & Software" className="dropdown-link">
                      Jobs By City
                    </Link>
                  </li>
                  <li>
                    <Link to="/jobs?category=Finance & Accounting" className="dropdown-link">
                     Jobs By Department
                    </Link>
                  </li>
                  <li>
                    <Link to="/jobs?category=Marketing & Sales" className="dropdown-link">
                     Jobs By Company
                    </Link>
                  </li>
                  <li>
                    <Link to="/jobs?category=Healthcare & Medical" className="dropdown-link">
                     Jobs By Qualification
                    </Link>
                  </li>
                  <li>
                    <Link to="/jobs?category=Engineering & Construction" className="dropdown-link">
                      Others
                    </Link>
                  </li>
                 
                </ul>
              </div>
              
            </div>

            {/* Careers Dropdown */}
             <div className="nav-item">
              <Link to="/about" className="nav-button">
                About Us
              </Link>
            </div>

            {/* Consultant Dropdown */}
            <div className="nav-item">
              <Link to="/contact" className="nav-button">
                Contact Us
              </Link>
            </div>
          </div>
         

          {/* Auth Buttons */}
          <div className="auth-buttons">
            {currentUser ? (
              <>
                {/* <span className="user-greeting">Hello, {currentUser.firstName}</span>
                <button className="logout-btn" onClick={logout}>
                  Logout
                </button> */}
                 <Link to="/dashboard" className="dashboard-btn">
        Dashboard
      </Link>
      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
              </>
            ) : (
              <>
                <button className="login-btn" onClick={openLoginModal}>
                  Login
                </button>
                <button className="signup-btn" onClick={openSignupModal}>
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
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
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? "active" : ""}`}>
        <div className="container">
          {/* Jobs Dropdown Mobile */}
          <div className="mobile-nav-item">
            <button className="mobile-nav-button" onClick={() => toggleMobileDropdown("jobs-mobile")}>
              <span>Jobs</span>
              <svg
                className={`chevron-down ${activeMobileDropdown === "jobs-mobile" ? "active" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div className={`mobile-dropdown ${activeMobileDropdown === "jobs-mobile" ? "active" : ""}`}>
              <ul>
                <li>
                  <Link to="/jobs?category=IT & Software" className="mobile-dropdown-link">
                    IT & Software
                  </Link>
                </li>
                <li>
                  <Link to="/jobs?category=Finance & Accounting" className="mobile-dropdown-link">
                    Finance & Accounting
                  </Link>
                </li>
                <li>
                  <Link to="/jobs?category=Marketing & Sales" className="mobile-dropdown-link">
                    Marketing & Sales
                  </Link>
                </li>
                <li>
                  <Link to="/jobs?category=Healthcare & Medical" className="mobile-dropdown-link">
                    Healthcare & Medical
                  </Link>
                </li>
                <li>
                  <Link to="/jobs?category=Engineering & Construction" className="mobile-dropdown-link">
                    Engineering & Construction
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="mobile-dropdown-link">
                    Browse All Jobs
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Careers Dropdown Mobile */}
          <div className="mobile-nav-item">
            <button className="mobile-nav-button" onClick={() => toggleMobileDropdown("careers-mobile")}>
              <span>Careers</span>
              <svg
                className={`chevron-down ${activeMobileDropdown === "careers-mobile" ? "active" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div className={`mobile-dropdown ${activeMobileDropdown === "careers-mobile" ? "active" : ""}`}>
              <ul>
                <li>
                  <Link to="/career-advice" className="mobile-dropdown-link">
                    Career Advice
                  </Link>
                </li>
                <li>
                  <Link to="/resume-building" className="mobile-dropdown-link">
                    Resume Building
                  </Link>
                </li>
                <li>
                  <Link to="/interview-preparation" className="mobile-dropdown-link">
                    Interview Preparation
                  </Link>
                </li>
                <li>
                  <Link to="/career-development" className="mobile-dropdown-link">
                    Career Development
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Consultant Dropdown Mobile */}
          <div className="mobile-nav-item">
            <button className="mobile-nav-button" onClick={() => toggleMobileDropdown("consultant-mobile")}>
              <span>Consultant</span>
              <svg
                className={`chevron-down ${activeMobileDropdown === "consultant-mobile" ? "active" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div className={`mobile-dropdown ${activeMobileDropdown === "consultant-mobile" ? "active" : ""}`}>
              <ul>
                <li>
                  <Link to="/recruitment-services" className="mobile-dropdown-link">
                    Recruitment Services
                  </Link>
                </li>
                <li>
                  <Link to="/hr-consulting" className="mobile-dropdown-link">
                    HR Consulting
                  </Link>
                </li>
                <li>
                  <Link to="/talent-acquisition" className="mobile-dropdown-link">
                    Talent Acquisition
                  </Link>
                </li>
                <li>
                  <Link to="/contact-consultant" className="mobile-dropdown-link">
                    Contact a Consultant
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {currentUser && (
  <div className="mobile-nav-item">
    <Link to="/dashboard" className="mobile-nav-button">
      Dashboard
    </Link>
  </div>
)}

          {/* Mobile Auth Buttons */}
          <div className="mobile-auth-buttons">
            {currentUser ? (
              <>
                <span className="user-greeting">Hello, {currentUser.firstName}</span>
                <button className="logout-btn" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button className="login-btn" onClick={openLoginModal}>
                  Login
                </button>
                <button className="signup-btn" onClick={openSignupModal}>
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
