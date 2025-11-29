"use client"

import { Link } from "react-router-dom"
import { useState } from "react"
import logo from "../assets/images/logo.jpg"

const Footer = () => {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would send this to your API
    console.log("Newsletter subscription for:", email)
    setSubscribed(true)
    setEmail("")

    // Reset the success message after 3 seconds
    setTimeout(() => {
      setSubscribed(false)
    }, 3000)
  }

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            {/* Company Info */}
            <div className="footer-column">
              <div className="footer-logo">
             
            <img src={logo}  className="footer-logo" alt="Nexus HR Logo" />
          
              </div>
              <p className="footer-description">
                Connecting exceptional talent with outstanding opportunities since 2010. Your trusted partner in
                recruitment and HR solutions.
              </p>
              <div className="footer-contact">
                <div className="contact-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
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
                  <span>
                    123 Business Avenue, Suite 500
                    <br />
                    New York, NY 10001
                  </span>
                </div>
                <div className="contact-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>(555) 123-4567</span>
                </div>
                <div className="contact-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
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
                  <span>info@nexus.com</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-column">
              <h3 className="footer-title">Quick Links</h3>
              <ul className="footer-links">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/services">Services</Link>
                </li>
                <li>
                  <Link to="/jobs">Job Listings</Link>
                </li>
                <li>
                  <Link to="/employers">For Employers</Link>
                </li>
                <li>
                  <Link to="/job-seekers">For Job Seekers</Link>
                </li>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
                <li>
                  <Link to="/privacy">Privacy Policy</Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="footer-column">
              <h3 className="footer-title">Our Services</h3>
              <ul className="footer-links">
                <li>
                  <Link to="/recruitment-services">Permanent Recruitment</Link>
                </li>
                <li>
                  <Link to="/executive-search">Executive Search</Link>
                </li>
                <li>
                  <Link to="/contract-staffing">Contract Staffing</Link>
                </li>
                <li>
                  <Link to="/hr-consulting">HR Consulting</Link>
                </li>
                <li>
                  <Link to="/rpo-solutions">RPO Solutions</Link>
                </li>
                <li>
                  <Link to="/career-coaching">Career Coaching</Link>
                </li>
                <li>
                  <Link to="/talent-assessment">Talent Assessment</Link>
                </li>
                <li>
                  <Link to="/employer-branding">Employer Branding</Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="footer-column">
              <h3 className="footer-title">Stay Connected</h3>
              <p className="newsletter-text">
                Subscribe to our newsletter for the latest job opportunities and career insights.
              </p>
              <form className="newsletter-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="newsletter-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="newsletter-button">
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
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </div>
                {subscribed && <div className="newsletter-success">Thank you for subscribing!</div>}
              </form>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="LinkedIn">
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
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href="#" className="social-link" aria-label="Twitter">
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
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
                <a href="#" className="social-link" aria-label="Facebook">
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
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="social-link" aria-label="Instagram">
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
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <div className="copyright">&copy; {new Date().getFullYear()} Nexus. All rights reserved.</div>
            <div className="footer-bottom-links">
              <Link to="/terms">Terms of Service</Link>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/cookies">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
