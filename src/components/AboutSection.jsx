const AboutSection = () => {
    return (
      <section className="about-section">
        <div className="container">
          <div className="about-container">
            <div className="about-images">
              <img
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Team meeting"
                className="about-image about-image-1"
              />
              <img
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Office space"
                className="about-image about-image-2"
              />
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Collaboration"
                className="about-image about-image-3"
              />
            </div>
            <div className="about-content">
              <h2 className="section-title">About Our Company</h2>
              <p className="about-text">
                Founded in 2010, Nexus HR has grown to become a leading recruitment and HR solutions provider with a
                mission to connect exceptional talent with outstanding opportunities. We believe that the right person in
                the right role can transform both careers and companies.
              </p>
              <p className="about-text">
                Our team of experienced recruiters and HR consultants brings industry-specific expertise to every client
                engagement. We understand the unique challenges and opportunities in today's competitive job market, and
                we're committed to delivering personalized solutions that drive success.
              </p>
              <p className="about-text">
                At Nexus HR, we leverage cutting-edge technology and human expertise to streamline the recruitment
                process, reduce time-to-hire, and ensure the perfect match between candidates and employers. Our approach
                is consultative, collaborative, and focused on building long-term relationships.
              </p>
              <div className="about-stats">
                <div className="stat-item">
                  <div className="stat-number">10K+</div>
                  <div className="stat-label">Successful Placements</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Corporate Clients</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">12+</div>
                  <div className="stat-label">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  export default AboutSection
  