import Categories from "../sections/homepage/categories"
import Gallery from "../sections/homepage/gallery"
import Guanacaste from "../sections/homepage/Guanacaste"
import Hero from "../sections/homepage/Hero"

const Homepage = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <Guanacaste />
      <Gallery />
    </div>
  )
}

export default Homepage