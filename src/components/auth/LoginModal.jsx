"use client"

import { useState, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import logo from "../../assets/images/logo.jpg"

const LoginModal = ({ closeModal, switchToSignup }) => {
  const { login, error: authError } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Validate form
      if (!formData.email || !formData.password) {
        throw new Error("Please fill in all fields")
      }

      const success = await login({
        email: formData.email,
        password: formData.password,
      })

      if (success) {
        
        closeModal()
        window.location.href = '/dashboard';
      } else {
        throw new Error(authError || "Login Successful")
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-modal" id="login-modal">
      <div className="auth-modal-content">
        <button className="auth-modal-close" onClick={closeModal}>
          &times;
        </button>
        <div className="auth-modal-container">
          <div className="auth-form-side">
            <div className="auth-logo">
              {/* Nexus<span></span> */}
              <img src={logo}  className="footer-logo" alt="Nexus HR Logo" />
            </div>
            <h2 className="auth-title">Welcome Back</h2>
            <p className="auth-subtitle">Sign in to access your account</p>

            {error && <div className="auth-error">{error}</div>}

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="auth-form-group">
                <label htmlFor="login-email">Email Address</label>
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
                    id="login-email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="auth-form-group">
                <div className="auth-label-container">
                  <label htmlFor="login-password">Password</label>
                  <a href="#" className="forgot-password">
                    Forgot Password?
                  </a>
                </div>
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
                    id="login-password"
                    name="password"
                    placeholder="Enter your password"
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
              </div>

              <div className="auth-form-group">
                <div className="remember-me">
                  <input
                    type="checkbox"
                    id="remember-me"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <label htmlFor="remember-me">Remember me</label>
                </div>
              </div>

              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </button>

              <div className="auth-divider">
                <span>OR</span>
              </div>

              <div className="auth-switch">
                <p>
                  Don't have an account?{" "}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      switchToSignup()
                    }}
                  >
                    Sign Up
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
                  d="M110,320c0,0,30-90,130-80s120,60,190,50s70-60,70-60v170c0,55-45,100-100,100H110V320z"
                />
                <path
                  className="st2"
                  d="M380,190c-16.6,0-30,13.4-30,30c0,16.6,13.4,30,30,30s30-13.4,30-30C410,203.4,396.6,190,380,190z"
                />
                <path
                  className="st3"
                  d="M380,230c-5.5,0-10-4.5-10-10c0-5.5,4.5-10,10-10s10,4.5,10,10C390,225.5,385.5,230,380,230z"
                />
                <path className="st4" d="M240,120c-66.1,0-120,53.9-120,120v120h240V240C360,173.9,306.1,120,240,120z" />
                <path className="st5" d="M240,120c-66.1,0-120,53.9-120,120v20h240v-20C360,173.9,306.1,120,240,120z" />
                <path
                  className="st2"
                  d="M310,320H170c-5.5,0-10-4.5-10-10v-40c0-44.1,35.9-80,80-80s80,35.9,80,80v40C320,315.5,315.5,320,310,320z"
                />
                <path className="st4" d="M240,220c-22.1,0-40,17.9-40,40v60h80v-60C280,237.9,262.1,220,240,220z" />
                <path className="st3" d="M240,280c-11,0-20-9-20-20s9-20,20-20s20,9,20,20S251,280,240,280z" />
                <path className="st4" d="M236,270c-2.2,0-4-1.8-4-4s1.8-4,4-4s4,1.8,4,4S238.2,270,236,270z" />
              </svg>
            </div>
            <div className="auth-image-text">
              <h3>Secure Access</h3>
              <p>Your data is protected with industry-leading encryption.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginModal
