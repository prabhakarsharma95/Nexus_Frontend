"use client"

import { useState } from "react"
import "../pages/styles/ContactPage.css"

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "general",
  })

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // In a real app, you would send this data to your backend
    console.log("Form submitted:", formData)

    // Simulate form submission
    setFormStatus({
      submitted: true,
      success: true,
      message: "Thank you for your message! We'll get back to you shortly.",
    })

    // Reset form after successful submission
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      inquiryType: "general",
    })

    // Reset form status after 5 seconds
    setTimeout(() => {
      setFormStatus({
        submitted: false,
        success: false,
        message: "",
      })
    }, 5000)
  }

  return (
    <main className="contact-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h1>Contact Us</h1>
            <p>Get in touch with our team to discuss how we can help you</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-container">
            <div className="contact-info">
              <h2 className="section-title">Get In Touch</h2>
              <p className="contact-intro">
                Whether you're looking for your next career opportunity or seeking top talent for your organization,
                we're here to help. Fill out the form or use our contact information below to reach out to us.
              </p>

              <div className="info-items">
                <div className="info-item">
                  <div className="info-icon">
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
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div className="info-content">
                    <h3>Our Location</h3>
                    <p>
                      123 Business Avenue, Suite 500
                      <br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
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
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div className="info-content">
                    <h3>Call Us</h3>
                    <p>(555) 123-4567</p>
                    <p>Monday - Friday, 9am - 6pm EST</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
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
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div className="info-content">
                    <h3>Email Us</h3>
                    <p>info@nexushr.com</p>
                    <p>careers@nexushr.com</p>
                  </div>
                </div>
              </div>

              <div className="social-media">
                <h3>Connect With Us</h3>
                <div className="social-icons">
                  <a href="#" className="social-icon" aria-label="LinkedIn">
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
                  <a href="#" className="social-icon" aria-label="Twitter">
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
                  <a href="#" className="social-icon" aria-label="Facebook">
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
                  <a href="#" className="social-icon" aria-label="Instagram">
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

            <div className="contact-form-container">
              <h2 className="section-title">Send Us a Message</h2>

              {formStatus.submitted && (
                <div className={`form-message ${formStatus.success ? "success" : "error"}`}>{formStatus.message}</div>
              )}

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="inquiryType">Inquiry Type</label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    required
                  >
                    <option value="general">General Inquiry</option>
                    <option value="job-seeker">Job Seeker</option>
                    <option value="employer">Employer</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573862687!2d-73.98784492346994!3d40.75097623440235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b30eac9f%3A0xaca8d930c1<Thinking>
I need to continue the code for the ContactPage.jsx component where it was cut off. The cut-off point was in the iframe src attribute for Google Maps. I'll continue from there, completing the iframe element and finishing the ContactPage component.
</Thinking>

d40.75097623440235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b30eac9f%3A0xaca8d930c1a01c7a!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1620164799176!5m2!1sen!2sus"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Nexus HR Office Location"
          ></iframe>
          
        </div>
      </section>

      {/* Office Locations Section */}
      <section className="locations-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Office Locations</h2>
            <p className="section-subtitle">
              Visit us at one of our offices around the country. Our team is ready to assist you with your recruitment
              and HR needs.
            </p>
          </div>

          <div className="locations-grid">
            <div className="location-card">
              <div className="location-header">
                <h3>New York</h3>
                <span className="location-badge">Headquarters</span>
              </div>
              <div className="location-details">
                <p>
                  123 Business Avenue, Suite 500
                  <br />
                  New York, NY 10001
                </p>
                <p>
                  <strong>Phone:</strong> (555) 123-4567
                </p>
                <p>
                  <strong>Email:</strong> newyork@nexushr.com
                </p>
                <p>
                  <strong>Hours:</strong> Monday - Friday, 9am - 6pm EST
                </p>
              </div>
            </div>

            <div className="location-card">
              <div className="location-header">
                <h3>Chicago</h3>
              </div>
              <div className="location-details">
                <p>
                  456 Recruitment Street, Floor 3
                  <br />
                  Chicago, IL 60601
                </p>
                <p>
                  <strong>Phone:</strong> (555) 234-5678
                </p>
                <p>
                  <strong>Email:</strong> chicago@nexushr.com
                </p>
                <p>
                  <strong>Hours:</strong> Monday - Friday, 9am - 6pm CST
                </p>
              </div>
            </div>

            <div className="location-card">
              <div className="location-header">
                <h3>San Francisco</h3>
              </div>
              <div className="location-details">
                <p>
                  789 Talent Avenue, Suite 300
                  <br />
                  San Francisco, CA 94105
                </p>
                <p>
                  <strong>Phone:</strong> (555) 345-6789
                </p>
                <p>
                  <strong>Email:</strong> sanfrancisco@nexushr.com
                </p>
                <p>
                  <strong>Hours:</strong> Monday - Friday, 9am - 6pm PST
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Find answers to common questions about our services and how we can help you.
            </p>
          </div>

          <div className="faq-container">
            <div className="faq-item">
              <h3 className="faq-question">What industries do you specialize in?</h3>
              <div className="faq-answer">
                <p>
                  We specialize in a wide range of industries including Technology, Finance, Healthcare, Manufacturing,
                  Retail, and Professional Services. Our team of recruiters has industry-specific expertise to ensure we
                  understand the unique requirements of each sector.
                </p>
              </div>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">How long does the recruitment process typically take?</h3>
              <div className="faq-answer">
                <p>
                  The timeline varies depending on the position, industry, and specific requirements. For standard
                  positions, we typically present qualified candidates within 1-2 weeks. Executive searches may take
                  longer due to the comprehensive nature of the search and assessment process. We always work with our
                  clients to establish clear timelines and expectations at the beginning of each engagement.
                </p>
              </div>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">What makes Nexus HR different from other recruitment agencies?</h3>
              <div className="faq-answer">
                <p>
                  Our approach is consultative and relationship-focused rather than transactional. We take the time to
                  understand both our clients' business needs and our candidates' career aspirations to ensure the
                  perfect match. We also leverage cutting-edge technology and data analytics to enhance our recruitment
                  process while maintaining the human touch that is essential in talent acquisition.
                </p>
              </div>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">Do you offer services for job seekers?</h3>
              <div className="faq-answer">
                <p>
                  Yes, we offer a range of services for job seekers including career coaching, resume optimization,
                  interview preparation, and access to exclusive job opportunities. Our goal is to help you navigate
                  your career journey with confidence and connect you with opportunities that align with your skills and
                  aspirations.
                </p>
              </div>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">What is your fee structure?</h3>
              <div className="faq-answer">
                <p>
                  Our fee structure varies depending on the service and engagement model. For permanent placements, we
                  typically work on a contingency or retained basis with fees based on a percentage of the candidate's
                  first-year salary. For contract staffing, RPO, and consulting services, we offer flexible pricing
                  models tailored to your specific needs. We're transparent about our fees and will discuss them in
                  detail during our initial consultation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ContactPage
