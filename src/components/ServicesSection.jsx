import { Link } from "react-router-dom"

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: "Permanent Recruitment",
      description:
        "We connect top-tier talent with leading companies across industries, ensuring the perfect match for long-term success and growth.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
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
      link: "/recruitment-services",
    },
    {
      id: 2,
      title: "Executive Search",
      description:
        "Our specialized executive search team identifies and attracts high-caliber leadership talent for critical C-suite and senior management roles.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
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
      link: "/executive-search",
    },
    {
      id: 3,
      title: "Contract Staffing",
      description:
        "Flexible workforce solutions to meet your temporary, project-based, or seasonal staffing needs with qualified professionals.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
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
      link: "/contract-staffing",
    },
    {
      id: 4,
      title: "HR Consulting",
      description:
        "Strategic HR advisory services to optimize your workforce, improve employee engagement, and enhance organizational performance.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
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
      link: "/hr-consulting",
    },
    {
      id: 5,
      title: "RPO Solutions",
      description:
        "Recruitment Process Outsourcing that streamlines your hiring process, reduces costs, and improves the quality of your talent acquisition.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
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
      link: "/rpo-solutions",
    },
    {
      id: 6,
      title: "Career Coaching",
      description:
        "Personalized career guidance, resume optimization, interview preparation, and professional development support for job seekers.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
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
      link: "/career-coaching",
    },
  ]

  return (
    <section className="services-section">
      <div className="container">
        <div className="services-header">
          <h2 className="section-title">Our Best Services</h2>
          <p className="section-subtitle">
            We offer comprehensive HR and recruitment solutions tailored to meet the unique needs of both employers and
            job seekers. Our expert team is dedicated to delivering exceptional results.
          </p>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <div className="service-card" key={service.id}>
              <div className="service-icon">{service.icon}</div>
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <Link to={service.link} className="service-link">
                  Learn More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
