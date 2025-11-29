"use client"

import { useState, useEffect } from "react"

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([])
  const [displayedReviews, setDisplayedReviews] = useState([])
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    text: "",
    rating: "",
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  // Mock reviews data
  const mockReviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Software Developer",
      rating: 5,
      date: "2023-05-15",
      text: "Nexus HR helped me find my dream job at a top tech company. Their team was professional, responsive, and truly understood my career goals. I highly recommend their services to anyone looking for new opportunities in the tech industry.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Finance Manager",
      rating: 5,
      date: "2023-04-22",
      text: "I was impressed by the quality of candidates Nexus HR presented for our finance team. They took the time to understand our company culture and requirements, resulting in successful placements that have added tremendous value to our organization.",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Marketing Director",
      rating: 4,
      date: "2023-06-03",
      text: "Working with Nexus HR was a seamless experience. Their career coaching services helped me refine my resume and interview skills, which ultimately led to securing a position with a 20% salary increase. Their insights into the job market were invaluable.",
    },
    {
      id: 4,
      name: "David Thompson",
      role: "HR Manager",
      rating: 5,
      date: "2023-03-18",
      text: "As an HR professional myself, I have high standards for recruitment services. Nexus HR exceeded my expectations with their thorough approach, industry knowledge, and commitment to finding the right cultural fit for our team. They are now our go-to recruitment partner.",
    },
    {
      id: 5,
      name: "Priya Patel",
      role: "Healthcare Administrator",
      rating: 4,
      date: "2023-05-29",
      text: "Nexus HR has a deep understanding of the healthcare industry and its unique staffing challenges. They helped us fill several specialized roles that had been vacant for months. Their consultative approach and candidate screening process saved us valuable time and resources.",
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Engineering Team Lead",
      rating: 5,
      date: "2023-04-10",
      text: "I've worked with several recruitment agencies in the past, but Nexus HR stands out for their personalized service and attention to detail. They found us engineers who not only had the technical skills we needed but also fit perfectly with our team dynamics.",
    },
  ]

  useEffect(() => {
    // In a real app, you would fetch reviews from an API
    setReviews(mockReviews)
    // Initially display only the first 3 reviews
    setDisplayedReviews(mockReviews.slice(0, 3))
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleRatingChange = (e) => {
    setFormData({
      ...formData,
      rating: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Create new review
    const newReview = {
      id: reviews.length + 1,
      name: formData.name,
      role: "Client",
      rating: Number.parseInt(formData.rating),
      date: new Date().toISOString().split("T")[0],
      text: formData.text,
    }

    // Add to reviews
    const updatedReviews = [newReview, ...reviews]
    setReviews(updatedReviews)

    // Update displayed reviews
    if (displayedReviews.length < 3) {
      setDisplayedReviews([newReview, ...displayedReviews])
    } else {
      setDisplayedReviews([newReview, ...displayedReviews.slice(0, 2)])
    }

    // Reset form
    setFormData({
      name: "",
      email: "",
      text: "",
      rating: "",
    })

    // Show success message
    setFormSubmitted(true)
    setTimeout(() => setFormSubmitted(false), 3000)
  }

  const loadMoreReviews = () => {
    setShowAllReviews(true)
    setDisplayedReviews(reviews)
  }

  // Generate star rating display
  const renderStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`star ${i <= rating ? "filled" : ""}`}>
          ★
        </span>,
      )
    }
    return stars
  }

  return (
    <section className="reviews-section">
      <div className="container">
        <div className="reviews-header">
          <h2 className="section-title">What Our Users Say</h2>
          <p className="section-subtitle">
            Read testimonials from job seekers and employers who found success with Nexus HR
          </p>
        </div>

        <div className="reviews-grid">
          {displayedReviews.map((review) => (
            <div className="review-card" key={review.id}>
              <div className="review-header">
                <div className="review-rating">{renderStars(review.rating)}</div>
                <div className="review-date">{review.date}</div>
              </div>
              <div className="review-content">
                <p className="review-text">{review.text}</p>
              </div>
              <div className="review-author">
                <div className="author-avatar">{review.name.charAt(0)}</div>
                <div className="author-info">
                  <div className="author-name">{review.name}</div>
                  <div className="author-role">{review.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="reviews-actions">
          {!showAllReviews && reviews.length > 3 && (
            <button className="load-more-btn" onClick={loadMoreReviews}>
              Read More Reviews
            </button>
          )}
        </div>

        <div className="review-form-container">
          <h3>Share Your Experience</h3>
          {formSubmitted && (
            <div className="form-success-message">Thank you for your review! It has been submitted successfully.</div>
          )}
          <form className="review-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="review-name">Your Name</label>
                <input
                  type="text"
                  id="review-name"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="review-email">Your Email</label>
                <input
                  type="email"
                  id="review-email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="review-text">Your Review</label>
              <textarea
                id="review-text"
                name="text"
                rows="4"
                placeholder="Tell us about your experience with Nexus HR"
                value={formData.text}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label>Rating</label>
              <div className="star-rating">
                <input
                  type="radio"
                  id="star5"
                  name="rating"
                  value="5"
                  checked={formData.rating === "5"}
                  onChange={handleRatingChange}
                  required
                />
                <label htmlFor="star5"></label>
                <input
                  type="radio"
                  id="star4"
                  name="rating"
                  value="4"
                  checked={formData.rating === "4"}
                  onChange={handleRatingChange}
                />
                <label htmlFor="star4"></label>
                <input
                  type="radio"
                  id="star3"
                  name="rating"
                  value="3"
                  checked={formData.rating === "3"}
                  onChange={handleRatingChange}
                />
                <label htmlFor="star3"></label>
                <input
                  type="radio"
                  id="star2"
                  name="rating"
                  value="2"
                  checked={formData.rating === "2"}
                  onChange={handleRatingChange}
                />
                <label htmlFor="star2"></label>
                <input
                  type="radio"
                  id="star1"
                  name="rating"
                  value="1"
                  checked={formData.rating === "1"}
                  onChange={handleRatingChange}
                />
                <label htmlFor="star1"></label>
              </div>
            </div>
            <button type="submit" className="submit-review-btn">
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ReviewsSection
