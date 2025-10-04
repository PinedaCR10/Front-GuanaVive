import Categories from "../sections/homepage/categories"
import ConoceMasSobreGuanacaste from "../sections/homepage/conocemassobreguanacaste"
import Gallery from "../sections/homepage/gallery"
import Guanacaste from "../sections/homepage/Guanacaste"
import Hero from "../sections/homepage/Hero"

const Homepage = () => {
  return (
    <div>
      <Hero />
      <section id="categories">
        <Categories />
      </section>
      <section id="guanacaste">
        <Guanacaste />
      </section>
      <section id="conocemas">
        <ConoceMasSobreGuanacaste />
      </section>
      <section id="gallery">
        <Gallery />
      </section>
    </div>
  )
}

export default Homepage