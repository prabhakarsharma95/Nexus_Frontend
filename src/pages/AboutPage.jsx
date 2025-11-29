import { Link } from "react-router-dom"
import "../pages/styles/AboutPage.css"

const AboutPage = () => {
  return (
    <main className="about-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h1>About Nexus HR</h1>
            <p>Learn about our mission, values, and the team behind our success</p>
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="company-story">
        <div className="container">
          <div className="story-container">
            <div className="story-content">
              <h2 className="section-title">Our Story</h2>
              <p>
                Founded in 2010, Nexus HR began with a simple mission: to transform the recruitment industry by creating
                meaningful connections between exceptional talent and outstanding opportunities. What started as a small
                team of passionate recruiters has grown into a leading HR solutions provider with a global presence.
              </p>
              <p>
                Our journey has been defined by a commitment to excellence, innovation, and a deep understanding of both
                our clients' business needs and our candidates' career aspirations. We believe that the right person in
                the right role can transform both careers and companies.
              </p>
              <p>
                Over the years, we've evolved our services to meet the changing demands of the modern workplace, but our
                core values remain the same: integrity, expertise, and a personalized approach to every client
                engagement.
              </p>
            </div>
            <div className="story-image">
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Nexus HR team meeting"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-vision">
        <div className="container">
          <div className="mission-vision-container">
            <div className="mission-box">
              <div className="mission-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
              </div>
              <h3>Our Mission</h3>
              <p>
                To connect exceptional talent with outstanding opportunities, creating lasting value for both candidates
                and employers through innovative recruitment solutions and personalized service.
              </p>
            </div>
            <div className="mission-box">
              <div className="mission-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
              <h3>Our Vision</h3>
              <p>
                To be the most trusted partner in talent acquisition and HR solutions, recognized for our expertise,
                integrity, and commitment to transforming careers and organizations worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Meet Our Leadership Team</h2>
            <p className="section-subtitle">
              Our experienced leadership team brings decades of industry expertise and a passion for connecting talent
              with opportunity.
            </p>
          </div>

          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Michael Thompson, CEO & Founder" />
              </div>
              <div className="member-info">
                <h3>Michael Thompson</h3>
                <p className="member-role">CEO & Founder</p>
                <p className="member-bio">
                  With over 20 years of experience in recruitment and HR, Michael founded Nexus HR with a vision to
                  transform the industry through innovation and exceptional service.
                </p>
                <div className="member-social">
                  <a href="#" aria-label="LinkedIn">
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
                  <a href="#" aria-label="Twitter">
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
                </div>
              </div>
            </div>

            <div className="team-member">
              <div className="member-image">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah Johnson, COO" />
              </div>
              <div className="member-info">
                <h3>Sarah Johnson</h3>
                <p className="member-role">Chief Operating Officer</p>
                <p className="member-bio">
                  Sarah oversees our day-to-day operations, ensuring that we deliver exceptional service to both clients
                  and candidates. Her strategic vision has been instrumental in our growth.
                </p>
                <div className="member-social">
                  <a href="#" aria-label="LinkedIn">
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
                </div>
              </div>
            </div>

            <div className="team-member">
              <div className="member-image">
                <img src="https://randomuser.me/api/portraits/men/62.jpg" alt="David Chen, CTO" />
              </div>
              <div className="member-info">
                <h3>David Chen</h3>
                <p className="member-role">Chief Technology Officer</p>
                <p className="member-bio">
                  David leads our technology initiatives, developing innovative solutions that streamline the
                  recruitment process and enhance the experience for both clients and candidates.
                </p>
                <div className="member-social">
                  <a href="#" aria-label="LinkedIn">
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
                  <a href="#" aria-label="GitHub">
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
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="team-member">
              <div className="member-image">
                <img
                  src="https://randomuser.me/api/portraits/women/68.jpg"
                  alt="Emily Rodriguez, Head of Talent Acquisition"
                />
              </div>
              <div className="member-info">
                <h3>Emily Rodriguez</h3>
                <p className="member-role">Head of Talent Acquisition</p>
                <p className="member-bio">
                  Emily brings a wealth of experience in talent acquisition and a deep understanding of various
                  industries, helping our clients find the perfect candidates for their unique needs.
                </p>
                <div className="member-social">
                  <a href="#" aria-label="LinkedIn">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-container">
            <h2>Ready to Work With Us?</h2>
            <p>
              Whether you're looking for your next career opportunity or seeking top talent for your organization, we're
              here to help.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="cta-button primary">
                Contact Us
              </Link>
              <Link to="/jobs" className="cta-button secondary">
                Browse Jobs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AboutPage
