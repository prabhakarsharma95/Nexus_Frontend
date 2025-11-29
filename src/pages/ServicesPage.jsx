import "../pages/styles/ServicesPage.css"
const ServicesPage = () => {
    const services = [
      {
        id: 1,
        title: "Permanent Recruitment",
        description:
          "Our permanent recruitment service connects top-tier talent with leading companies across industries. We take the time to understand both our clients' business needs and our candidates' career aspirations, ensuring the perfect match for long-term success and growth.",
        features: [
          "Comprehensive candidate screening and assessment",
          "Industry-specific expertise across multiple sectors",
          "Tailored recruitment strategies for each position",
          "Extensive talent network and market insights",
          "Ongoing support throughout the hiring process",
        ],
        icon: (
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
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        ),
      },
      {
        id: 2,
        title: "Executive Search",
        description:
          "Our specialized executive search team identifies and attracts high-caliber leadership talent for critical C-suite and senior management roles. We employ a rigorous and discreet approach to find exceptional leaders who can drive your organization forward.",
        features: [
          "Targeted search for senior leadership positions",
          "Comprehensive market mapping and competitor analysis",
          "Discreet approach to candidate engagement",
          "In-depth assessment of leadership capabilities",
          "Strategic counsel throughout the selection process",
        ],
        icon: (
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
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
        ),
      },
      {
        id: 3,
        title: "Contract Staffing",
        description:
          "Our contract staffing solutions provide flexible workforce options to meet your temporary, project-based, or seasonal staffing needs. We quickly deploy qualified professionals who can make an immediate impact, allowing you to scale your team efficiently.",
        features: [
          "Rapid deployment of skilled professionals",
          "Flexible staffing solutions for varying timeframes",
          "Comprehensive compliance and payroll management",
          "Quality assurance and performance monitoring",
          "Option to convert contractors to permanent employees",
        ],
        icon: (
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
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </svg>
        ),
      },
      {
        id: 4,
        title: "HR Consulting",
        description:
          "Our HR consulting services provide strategic advisory to optimize your workforce, improve employee engagement, and enhance organizational performance. We work closely with your team to develop tailored solutions that address your specific challenges and opportunities.",
        features: [
          "Organizational design and workforce planning",
          "Performance management systems",
          "Employee engagement and retention strategies",
          "Compensation and benefits analysis",
          "HR policy development and implementation",
        ],
        icon: (
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
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        ),
      },
      {
        id: 5,
        title: "RPO Solutions",
        description:
          "Our Recruitment Process Outsourcing (RPO) solutions streamline your hiring process, reduce costs, and improve the quality of your talent acquisition. We act as an extension of your HR team, managing part or all of your recruitment function to deliver consistent, high-quality results.",
        features: [
          "End-to-end recruitment process management",
          "Scalable solutions for varying hiring volumes",
          "Advanced recruitment technology and analytics",
          "Employer brand development and management",
          "Continuous improvement and process optimization",
        ],
        icon: (
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
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        ),
      },
      {
        id: 6,
        title: "Career Coaching",
        description:
          "Our career coaching services provide personalized guidance, resume optimization, interview preparation, and professional development support for job seekers. We help you navigate your career journey with confidence, clarity, and purpose.",
        features: [
          "Personalized career assessment and planning",
          "Resume and LinkedIn profile optimization",
          "Interview preparation and coaching",
          "Salary negotiation strategies",
          "Ongoing career development support",
        ],
        icon: (
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
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
        ),
      },
    ]
  
    return (
      <main className="services-page">
        {/* Hero Section */}
        <section className="page-hero">
          <div className="hero-overlay"></div>
          <div className="container">
            <div className="hero-content">
              <h1>Our Services</h1>
              <p>Comprehensive HR and recruitment solutions tailored to your needs</p>
            </div>
          </div>
        </section>
  
        {/* Services Overview */}
        <section className="services-overview">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">How We Can Help You</h2>
              <p className="section-subtitle">
                We offer a comprehensive range of HR and recruitment solutions designed to meet the unique needs of both
                employers and job seekers. Our expert team is dedicated to delivering exceptional results.
              </p>
            </div>
  
            <div className="services-list">
              {services.map((service) => (
                <div className="service-item" key={service.id}>
                  <div className="service-header">
                    <div className="service-icon">{service.icon}</div>
                    <h3 className="service-title">{service.title}</h3>
                  </div>
                  <div className="service-content">
                    <p className="service-description">{service.description}</p>
                    <div className="service-features">
                      <h4>Key Features</h4>
                      <ul>
                        {service.features.map((feature, index) => (
                          <li key={index}>
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
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* Process Section */}
        <section className="process-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Our Recruitment Process</h2>
              <p className="section-subtitle">
                Our structured approach ensures we find the right talent for your organization or the right opportunity
                for your career.
              </p>
            </div>
  
            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Consultation</h3>
                  <p>
                    We begin with a thorough consultation to understand your specific needs, whether you're an employer
                    looking for talent or a candidate seeking new opportunities.
                  </p>
                </div>
              </div>
  
              <div className="process-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Strategy Development</h3>
                  <p>
                    Based on our consultation, we develop a tailored strategy to meet your unique requirements, leveraging
                    our industry expertise and market insights.
                  </p>
                </div>
              </div>
  
              <div className="process-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Search & Selection</h3>
                  <p>
                    Our team conducts a comprehensive search, screening, and selection process to identify the best
                    candidates or opportunities that align with your goals.
                  </p>
                </div>
              </div>
  
              <div className="process-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Presentation & Interview</h3>
                  <p>
                    We present carefully selected candidates or opportunities, facilitate interviews, and provide guidance
                    throughout the process to ensure the best possible match.
                  </p>
                </div>
              </div>
  
              <div className="process-step">
                <div className="step-number">5</div>
                <div className="step-content">
                  <h3>Offer & Onboarding</h3>
                  <p>
                    We assist with offer negotiation and provide support during the onboarding process to ensure a smooth
                    transition for both employers and candidates.
                  </p>
                </div>
              </div>
  
              <div className="process-step">
                <div className="step-number">6</div>
                <div className="step-content">
                  <h3>Ongoing Support</h3>
                  <p>
                    Our relationship doesn't end with placement. We provide ongoing support to ensure long-term success
                    for both employers and candidates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        {/* Testimonials Section */}
        <section className="testimonials-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">What Our Clients Say</h2>
              <p className="section-subtitle">
                Don't just take our word for it. Here's what our clients have to say about our services.
              </p>
            </div>
  
            <div className="testimonials-grid">
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <svg
                    className="quote-icon"
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
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                  </svg>
                  <p>
                    "Nexus HR has been an invaluable partner in our talent acquisition efforts. Their team took the time
                    to understand our company culture and specific needs, resulting in high-quality candidates who have
                    made a significant impact on our organization."
                  </p>
                </div>
                <div className="testimonial-author">
                  <img src="https://randomuser.me/api/portraits/men/42.jpg" alt="John Davis" className="author-image" />
                  <div className="author-details">
                    <h4>John Davis</h4>
                    <p>HR Director, TechCorp Solutions</p>
                  </div>
                </div>
              </div>
  
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <svg
                    className="quote-icon"
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
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                  </svg>
                  <p>
                    "As a job seeker, I was impressed by the personalized approach Nexus HR took to understand my career
                    goals and aspirations. Their career coaching services helped me refine my resume and interview skills,
                    ultimately leading to a position that perfectly aligns with my career path."
                  </p>
                </div>
                <div className="testimonial-author">
                  <img src="https://randomuser.me/api/portraits/women/24.jpg" alt="Lisa Chen" className="author-image" />
                  <div className="author-details">
                    <h4>Lisa Chen</h4>
                    <p>Marketing Manager, Brand Innovators</p>
                  </div>
                </div>
              </div>
  
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <svg
                    className="quote-icon"
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
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                  </svg>
                  <p>
                    "We've partnered with Nexus HR for our executive search needs, and they've consistently delivered
                    exceptional candidates for our leadership positions. Their thorough understanding of our industry and
                    discreet approach has made them our go-to recruitment partner."
                  </p>
                </div>
                <div className="testimonial-author">
                  <img
                    src="https://randomuser.me/api/portraits/men/76.jpg"
                    alt="Robert Wilson"
                    className="author-image"
                  />
                  <div className="author-details">
                    <h4>Robert Wilson</h4>
                    <p>CEO, Global Finance Partners</p>
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
              <h2>Ready to Transform Your Recruitment Process?</h2>
              <p>
                Contact us today to discuss how our services can help you find the right talent or advance your career.
              </p>
              <a href="/contact" className="cta-button">
                Get Started
              </a>
            </div>
          </div>
        </section>
      </main>
    )
  }
  
  export default ServicesPage
  