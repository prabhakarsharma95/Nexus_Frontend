"use client"

import { useState } from "react"
import { jobService } from "../services/api"

const PostJobForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    category: "IT & Software",
    description: "",
    requirements: "",
    responsibilities: "",
    salary: {
      min: "",
      max: "",
      currency: "USD",
    },
    experience: "0-1 years",
    education: "Bachelor's Degree",
    skills: [],
    benefits: [],
    applicationDeadline: "",
    status: "active",
  })

  const [currentSkill, setCurrentSkill] = useState("")
  const [currentBenefit, setCurrentBenefit] = useState("")
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name.includes("salary.")) {
      const salaryField = name.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        salary: {
          ...prev.salary,
          [salaryField]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSkillAdd = () => {
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()],
      }))
      setCurrentSkill("")
    }
  }

  const handleSkillRemove = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  const handleBenefitAdd = () => {
    if (currentBenefit.trim() && !formData.benefits.includes(currentBenefit.trim())) {
      setFormData((prev) => ({
        ...prev,
        benefits: [...prev.benefits, currentBenefit.trim()],
      }))
      setCurrentBenefit("")
    }
  }

  const handleBenefitRemove = (benefitToRemove) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((benefit) => benefit !== benefitToRemove),
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) newErrors.title = "Job title is required"
    if (!formData.company.trim()) newErrors.company = "Company name is required"
    if (!formData.location.trim()) newErrors.location = "Location is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.requirements.trim()) newErrors.requirements = "Requirements are required"
    if (!formData.responsibilities.trim()) newErrors.responsibilities = "Responsibilities are required"
    if (!formData.salary.min || isNaN(formData.salary.min)) newErrors.salaryMin = "Valid minimum salary is required"
    if (!formData.salary.max || isNaN(formData.salary.max)) newErrors.salaryMax = "Valid maximum salary is required"
    if (formData.skills.length === 0) newErrors.skills = "At least one skill is required"
    if (!formData.applicationDeadline) newErrors.applicationDeadline = "Deadline is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      setIsSubmitting(true)

      // Convert salary to numbers
      const jobData = {
        ...formData,
        salary: {
          min: Number(formData.salary.min),
          max: Number(formData.salary.max),
          currency: formData.salary.currency,
        },
      }

      // Use createJob instead of postJob
      const response = await jobService.createJob(jobData)

      if (response.success) {
        // Reset form
        setFormData({
          title: "",
          company: "",
          location: "",
          type: "Full-time",
          category: "IT & Software",
          description: "",
          requirements: "",
          responsibilities: "",
          salary: {
            min: "",
            max: "",
            currency: "USD",
          },
          experience: "0-1 years",
          education: "Bachelor's Degree",
          skills: [],
          benefits: [],
          applicationDeadline: "",
          status: "active",
        })

        // Show success message
        alert("Job posted successfully!")

        // Call the onSuccess callback to close the modal and refresh jobs
        if (onSuccess) {
          onSuccess(response.job)
        }
      }
    } catch (error) {
      console.error("Error posting job:", error)
      alert(error.response?.data?.message || "Failed to post job. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="post-job-container">
      <h1>Post a New Job</h1>
      <form onSubmit={handleSubmit} className="job-form">
        {/* Basic Information Section */}
        <div className="form-section">
          <h2>Basic Information</h2>
          <div className="form-row">
            <div className={`form-group ${errors.title ? "error" : ""}`}>
              <label htmlFor="title">Job Title*</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Senior Software Engineer"
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>

            <div className={`form-group ${errors.company ? "error" : ""}`}>
              <label htmlFor="company">Company Name*</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your company name"
              />
              {errors.company && <span className="error-message">{errors.company}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className={`form-group ${errors.location ? "error" : ""}`}>
              <label htmlFor="location">Location*</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. New York, NY or Remote"
              />
              {errors.location && <span className="error-message">{errors.location}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="type">Job Type*</label>
              <select id="type" name="type" value={formData.type} onChange={handleChange}>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category*</label>
              <select id="category" name="category" value={formData.category} onChange={handleChange}>
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

            <div className={`form-group ${errors.applicationDeadline ? "error" : ""}`}>
              <label htmlFor="applicationDeadline">Application Deadline*</label>
              <input
                type="date"
                id="applicationDeadline"
                name="applicationDeadline"
                value={formData.applicationDeadline}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
              />
              {errors.applicationDeadline && <span className="error-message">{errors.applicationDeadline}</span>}
            </div>
          </div>
        </div>

        {/* Salary Information */}
        <div className="form-section">
          <h2>Salary Information</h2>
          <div className="form-row">
            <div className={`form-group ${errors.salaryMin ? "error" : ""}`}>
              <label htmlFor="salary.min">Minimum Salary*</label>
              <div className="salary-input">
                <span className="currency">{formData.salary.currency}</span>
                <input
                  type="number"
                  id="salary.min"
                  name="salary.min"
                  value={formData.salary.min}
                  onChange={handleChange}
                  placeholder="e.g. 50000"
                />
              </div>
              {errors.salaryMin && <span className="error-message">{errors.salaryMin}</span>}
            </div>

            <div className={`form-group ${errors.salaryMax ? "error" : ""}`}>
              <label htmlFor="salary.max">Maximum Salary*</label>
              <div className="salary-input">
                <span className="currency">{formData.salary.currency}</span>
                <input
                  type="number"
                  id="salary.max"
                  name="salary.max"
                  value={formData.salary.max}
                  onChange={handleChange}
                  placeholder="e.g. 80000"
                />
              </div>
              {errors.salaryMax && <span className="error-message">{errors.salaryMax}</span>}
            </div>
          </div>
        </div>

        {/* Job Details Section */}
        <div className="form-section">
          <h2>Job Details</h2>
          <div className={`form-group ${errors.description ? "error" : ""}`}>
            <label htmlFor="description">Job Description*</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              placeholder="Describe the job responsibilities, company culture, etc."
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          <div className={`form-group ${errors.requirements ? "error" : ""}`}>
            <label htmlFor="requirements">Requirements*</label>
            <textarea
              id="requirements"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              rows={6}
              placeholder="List the required qualifications, skills, and experience"
            />
            {errors.requirements && <span className="error-message">{errors.requirements}</span>}
          </div>

          <div className={`form-group ${errors.responsibilities ? "error" : ""}`}>
            <label htmlFor="responsibilities">Responsibilities*</label>
            <textarea
              id="responsibilities"
              name="responsibilities"
              value={formData.responsibilities}
              onChange={handleChange}
              rows={6}
              placeholder="Detail the day-to-day responsibilities of this position"
            />
            {errors.responsibilities && <span className="error-message">{errors.responsibilities}</span>}
          </div>
        </div>

        {/* Skills & Benefits Section */}
        <div className="form-section">
          <div className="form-row">
            <div className={`form-group ${errors.skills ? "error" : ""}`}>
              <label htmlFor="skills">Required Skills*</label>
              <div className="tag-input">
                <input
                  type="text"
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  placeholder="Add a skill and press Enter"
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleSkillAdd())}
                />
                <button type="button" onClick={handleSkillAdd} className="add-button">
                  Add
                </button>
              </div>
              {errors.skills && <span className="error-message">{errors.skills}</span>}
              <div className="tags-container">
                {formData.skills.map((skill, index) => (
                  <span key={index} className="tag">
                    {skill}
                    <button type="button" onClick={() => handleSkillRemove(skill)} className="remove-tag">
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="benefits">Benefits (Optional)</label>
              <div className="tag-input">
                <input
                  type="text"
                  value={currentBenefit}
                  onChange={(e) => setCurrentBenefit(e.target.value)}
                  placeholder="Add a benefit and press Enter"
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleBenefitAdd())}
                />
                <button type="button" onClick={handleBenefitAdd} className="add-button">
                  Add
                </button>
              </div>
              <div className="tags-container">
                {formData.benefits.map((benefit, index) => (
                  <span key={index} className="tag">
                    {benefit}
                    <button type="button" onClick={() => handleBenefitRemove(benefit)} className="remove-tag">
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Experience & Education */}
        <div className="form-section">
          <h2>Candidate Requirements</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="experience">Experience Level*</label>
              <select id="experience" name="experience" value={formData.experience} onChange={handleChange}>
                <option value="0-1 years">0-1 years</option>
                <option value="1-2 years">1-2 years</option>
                <option value="2-4 years">2-4 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5+ years">5+ years</option>
                <option value="7+ years">7+ years</option>
                <option value="10+ years">10+ years</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="education">Education Level*</label>
              <select id="education" name="education" value={formData.education} onChange={handleChange}>
                <option value="High School">High School</option>
                <option value="Associate Degree">Associate Degree</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="PhD">PhD</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? "Posting..." : "Post Job"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PostJobForm
