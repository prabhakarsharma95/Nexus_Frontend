"use client"

import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import JobsPage from "./pages/JobsPage"
import JobDetailsPage from "./pages/JobDetailsPage"
import AboutPage from "./pages/AboutPage"
import ServicesPage from "./pages/ServicesPage"
import ContactPage from "./pages/ContactPage"
import Footer from "./components/Footer"
import EmployerDashboardPage from "./pages/EmployerDashboardPage"
import JobApplicantsPage from "./pages/JobApplicantsPage"
import UserApplicationsPage from "./pages/UserApplicationsPage"
import LoginModal from "./components/auth/LoginModal"
import SignupModal from "./components/auth/SignupModal"
import { AuthProvider } from "./context/AuthContext"
import BrochureButton from "./components/BrochureButton"
import DashboardPage from "./pages/DashboardPage"
import ProtectedRoute from '../src/context/ProtectedRoute';
import "./App.css"

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)

  const openLoginModal = () => {
    setShowSignupModal(false)
    setShowLoginModal(true)
  }

  const openSignupModal = () => {
    setShowLoginModal(false)
    setShowSignupModal(true)
  }

  const closeLoginModal = () => {
    setShowLoginModal(false)
  }

  const closeSignupModal = () => {
    setShowSignupModal(false)
  }

  const switchToSignup = () => {
    setShowLoginModal(false)
    setShowSignupModal(true)
  }

  const switchToLogin = () => {
    setShowSignupModal(false)
    setShowLoginModal(true)
  }

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar openLoginModal={openLoginModal} openSignupModal={openSignupModal} />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/:id" element={<JobDetailsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Job seeker dashboard - only accessible to job seekers */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requiredRole="job-seeker">
                  <DashboardPage />
                </ProtectedRoute>
              }
            />

            {/* Employer dashboard - only accessible to employers */}
            <Route
              path="/employer/dashboard"
              element={
                <ProtectedRoute requiredRole="employer">
                  <EmployerDashboardPage />
                </ProtectedRoute>
              }
            />

            {/* Routes for job applications and management */}
            <Route
              path="/applications"
              element={
                <ProtectedRoute requiredRole="job-seeker">
                  <UserApplicationsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/job/:id/applicants"
              element={
                <ProtectedRoute requiredRole="employer">
                  <JobApplicantsPage />
                </ProtectedRoute>
              }
            />

            {/* <Route
              path="/edit-job/:id"
              element={
                <ProtectedRoute requiredRole="employer">
                  <EditJobPage />
                </ProtectedRoute>
              }
            /> */}
          </Routes>

          <Footer />
          <BrochureButton brochureUrl="/path-to-your-brochure.pdf" fileName="NexusHR-Brochure.pdf" />

          {showLoginModal && <LoginModal closeModal={closeLoginModal} switchToSignup={switchToSignup} />}

          {showSignupModal && <SignupModal closeModal={closeSignupModal} switchToLogin={switchToLogin} />}
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
