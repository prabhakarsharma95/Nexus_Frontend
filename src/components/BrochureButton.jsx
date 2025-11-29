"use client"

import { useState, useEffect } from "react"
import { Download } from 'lucide-react'

const BrochureButton = ({ brochureUrl = "/brochure.pdf", fileName = "company-brochure.pdf" }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    // Add a small delay before showing the button for a nice entrance effect
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleDownload = () => {
    setIsClicked(true)
    
    // Create a temporary link element
    const link = document.createElement("a")
    link.href = brochureUrl
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // Reset the click animation after a delay
    setTimeout(() => {
      setIsClicked(false)
    }, 1500)
  }

  return (
   <div className={`download-button-container ${isVisible ? 'visible' : 'hidden'}`}>
  {isHovered && (
    <div className="download-tooltip">Get our brochure</div>
  )}
  
  <button
   onClick={handleDownload}
   onMouseEnter={() => setIsHovered(true)}
   onMouseLeave={() => setIsHovered(false)}
    className={`download-button ${isClicked ? 'scaled' : ''}`}
    // ... other props
  >
    <span className={`download-icon ${isClicked ? 'clicked' : ''}`}>
      <Download size={24} />
    </span>
    
    {isClicked && (
      <div className="success-checkmark">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
    )}
  </button>
</div>
  )
}

export default BrochureButton
