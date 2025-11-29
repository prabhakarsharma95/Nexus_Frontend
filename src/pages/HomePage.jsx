import SearchBar from "../components/SearchBar"
import Carousel from "../components/Carousel"
import AboutSection from "../components/AboutSection"
import ServicesSection from "../components/ServicesSection"
import ReviewsSection from "../components/ReviewsSection"

const HomePage = () => {
  return (
    <main className="home-page">
      <SearchBar />
      <Carousel />
      <AboutSection />
      <ServicesSection />
      <ReviewsSection />
    </main>
  )
}

export default HomePage
