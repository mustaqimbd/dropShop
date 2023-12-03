import FeatureProducts from "./FeaturedProducts/FeatureProducts";
import Hero from "./Hero/Hero";
import HighlightPolicy from "./HighlightPolicy/HighlightPolicy";
import HighlightSection from "./HighlightSection/HighlightSection";
import ProductsCategories from "./ProductsCategories/ProductsCategories";

const Home = () => {
  return (
    <div>
      <Hero />
      <ProductsCategories />
      <FeatureProducts />
      <div>
        <HighlightSection />
      </div>
      <HighlightPolicy />
    </div>
  );
};

export default Home;
