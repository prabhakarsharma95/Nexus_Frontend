"use client"

import { useState, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"

const Carousel = () => {
  const [activeSlide, setActiveSlide] = useState(0)
  const totalSlides = 4

  const slides = [
    {
      id: 0,
      image:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      title: "Find Your Dream Career With Nexus HR",
      description:
        "We connect top talent with leading companies across industries. Our expert recruiters help you find the perfect job match for your skills and career goals.",
      cta: { text: "Search Jobs", link: "/jobs" },
    },
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      title: "Expert Recruitment Solutions",
      description:
        "Nexus HR provides comprehensive recruitment services tailored to your company's unique needs. We help you find the right talent to drive your business forward.",
      cta: { text: "Our Services", link: "/recruitment-services" },
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      title: "Career Development Resources",
      description:
        "Access our extensive library of career resources, from resume building to interview preparation. We're committed to helping you succeed at every stage of your career journey.",
      cta: { text: "Learn More", link: "/career-advice" },
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      title: "Trusted by Leading Companies",
      description:
        "Join thousands of satisfied clients who trust Nexus HR for their recruitment needs. Our proven track record speaks for itself with successful placements across industries.",
      cta: { text: "Client Testimonials", link: "/testimonials" },
    },
  ]

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }, [totalSlides])

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }

  const goToSlide = (index) => {
    setActiveSlide(index)
  }

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    <div className="carousel-container">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`carousel-slide ${activeSlide === index ? "active" : ""}`}
          style={{ backgroundImage: `url('${slide.image}')` }}
        >
          <div className="carousel-overlay"></div>
          <div className="slide-content">
            <h2>{slide.title}</h2>
            <p>{slide.description}</p>
            <Link to={slide.cta.link} className="cta-button">
              {slide.cta.text}
            </Link>
          </div>
        </div>
      ))}

      {/* Navigation buttons */}
      <button className="carousel-button prev" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="carousel-button next" onClick={nextSlide}>
        &#10095;
      </button>

      {/* Indicators */}
      <div className="carousel-nav">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-indicator ${activeSlide === index ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default Carousel
