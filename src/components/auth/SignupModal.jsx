"use client"

import { useState, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import logo from "../../assets/images/logo.jpg"

const SignupModal = ({ closeModal, switchToLogin }) => {
  const { signup, error: authError } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "job-seeker",
    companyCode: "", // Added company invitation code field
    termsAgreed: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

    // Calculate password strength when password changes
    if (name === "password") {
      calculatePasswordStrength(value)
    }
  }

  const calculatePasswordStrength = (password) => {
    let strength = 0

    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1

    setPasswordStrength(strength)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Validate form
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        throw new Error("Please fill in all required fields")
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match")
      }

      if (formData.password.length < 8) {
        throw new Error("Password must be at least 8 characters long")
      }

      // Validate company code for employers
      if (formData.role === "employer" && !formData.companyCode.trim()) {
        throw new Error("Company invitation code is required for employer accounts")
      }

      if (!formData.termsAgreed) {
        throw new Error("You must agree to the Terms of Service and Privacy Policy")
      }

      // Create user object
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        companyCode: formData.role === "employer" ? formData.companyCode : undefined,
      }

      const success = await signup(userData)

      if (success) {
        closeModal()
        window.location.href = "/dashboard"
      } else {
        throw new Error(authError || "Signup failed")
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-modal" id="signup-modal">
      <div className="auth-modal-content">
        <button className="auth-modal-close" onClick={closeModal}>
          &times;
        </button>
        <div className="auth-modal-container">
          <div className="auth-form-side">
            <div className="auth-logo">
              <img src={logo || "/placeholder.svg"} className="footer-logo" alt="Nexus Logo" />
            </div>
            <h2 className="auth-title">Create an Account</h2>
            <p className="auth-subtitle">Join our community of professionals</p>

            {error && <div className="auth-error">{error}</div>}

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="auth-form-row">
                <div className="auth-form-group">
                  <label htmlFor="signup-first-name">First Name</label>
                  <div className="auth-input-container">
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
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <input
                      type="text"
                      id="signup-first-name"
                      name="firstName"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="auth-form-group">
                  <label htmlFor="signup-last-name">Last Name</label>
                  <div className="auth-input-container">
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
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <input
                      type="text"
                      id="signup-last-name"
                      name="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="auth-form-group">
                <label htmlFor="signup-email">Email Address</label>
                <div className="auth-input-container">
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
                  <input
                    type="email"
                    id="signup-email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="auth-form-group">
                <label htmlFor="signup-password">Password</label>
                <div className="auth-input-container">
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
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="signup-password"
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button type="button" className="password-toggle" onClick={togglePasswordVisibility}>
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
                      className="eye-icon"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                </div>
                <div className="password-strength">
                  <div className="strength-meter">
                    <div className={`strength-segment ${passwordStrength >= 1 ? "active" : ""}`}></div>
                    <div className={`strength-segment ${passwordStrength >= 2 ? "active" : ""}`}></div>
                    <div className={`strength-segment ${passwordStrength >= 3 ? "active" : ""}`}></div>
                    <div className={`strength-segment ${passwordStrength >= 4 ? "active" : ""}`}></div>
                  </div>
                  <span className="strength-text">
                    {passwordStrength === 0 && "Password strength"}
                    {passwordStrength === 1 && "Weak"}
                    {passwordStrength === 2 && "Fair"}
                    {passwordStrength === 3 && "Good"}
                    {passwordStrength === 4 && "Strong"}
                  </span>
                </div>
              </div>

              <div className="auth-form-group">
                <label htmlFor="signup-confirm-password">Confirm Password</label>
                <div className="auth-input-container">
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
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="signup-confirm-password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button type="button" className="password-toggle" onClick={toggleConfirmPasswordVisibility}>
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
                      className="eye-icon"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="auth-form-group">
                <label>I am a</label>
                <div className="role-selector">
                  <label className="role-option">
                    <input
                      type="radio"
                      name="role"
                      value="job-seeker"
                      checked={formData.role === "job-seeker"}
                      onChange={handleChange}
                    />
                    <div className="role-option-content">
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
                      <span>Job Seeker</span>
                    </div>
                  </label>
                  <label className="role-option">
                    <input
                      type="radio"
                      name="role"
                      value="employer"
                      checked={formData.role === "employer"}
                      onChange={handleChange}
                    />
                    <div className="role-option-content">
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
                      <span>Employer</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Company Invitation Code field - only shown for employers */}
              {formData.role === "employer" && (
                <div className="auth-form-group">
                  <label htmlFor="company-code">Company Invitation Code</label>
                  <div className="auth-input-container">
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
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <input
                      type="text"
                      id="company-code"
                      name="companyCode"
                      placeholder="Enter company invitation code"
                      value={formData.companyCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <small className="form-hint">
                    This code is required to verify your employer status. Contact support if you don't have a code.
                  </small>
                </div>
              )}

              <div className="auth-form-group">
                <div className="terms-checkbox">
                  <input
                    type="checkbox"
                    id="terms-agree"
                    name="termsAgreed"
                    checked={formData.termsAgreed}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="terms-agree">
                    I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
                  </label>
                </div>
              </div>

              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"}
              </button>

              <div className="auth-divider">
                <span>OR</span>
              </div>

              <div className="auth-switch">
                <p>
                  Already have an account?{" "}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      switchToLogin()
                    }}
                  >
                    Sign In
                  </a>
                </p>
              </div>
            </form>
          </div>
          <div className="auth-image-side">
            <div className="auth-image">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
                <style>
                  {`.st0{fill:#F0F7FF;} .st1{fill:#BFDBFE;} .st2{fill:#2563EB;} .st3{fill:#1D4ED8;} .st4{fill:#FFFFFF;} .st5{fill:#93C5FD;}`}
                </style>
                <circle className="st0" cx="250" cy="250" r="250" />
                <path
                  className="st1"
                  d="M100,350c0,0,50-80,150-60s120,40,150,20s100-80,100-80v170c0,55-45,100-100,100H100V350z"
                />
                <path className="st2" d="M250,120c-55.2,0-100,44.8-100,100v160h200V220C350,164.8,305.2,120,250,120z" />
                <path className="st4" d="M250,140c-44.2,0-80,35.8-80,80v140h160V220C330,175.8,294.2,140,250,140z" />
                <path className="st5" d="M330,240H170c0-44.2,35.8-80,80-80S330,195.8,330,240z" />
                <circle className="st3" cx="250" cy="200" r="30" />
                <path
                  className="st4"
                  d="M250,320L250,320c-22.1,0-40-17.9-40-40v-40h80v40C290,302.1,272.1,320,250,320z"
                />
                <path className="st3" d="M290,280h-80v-20c0-22.1,17.9-40,40-40l0,0c22.1,0,40,17.9,40,40V280z" />
                <circle className="st4" cx="250" cy="200" r="10" />
                <circle className="st2" cx="380" cy="180" r="30" />
                <circle className="st4" cx="380" cy="180" r="10" />
                <circle className="st2" cx="120" cy="200" r="20" />
                <circle className="st4" cx="120" cy="200" r="6" />
              </svg>
            </div>
            <div className="auth-image-text">
              <h3>Join Our Community</h3>
              <p>Connect with top employers and find your dream job.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupModal
