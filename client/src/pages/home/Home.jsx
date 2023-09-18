import FeatureProducts from "./FeaturedProducts/FeatureProducts";
import HighlightPolicy from "./HighlightPolicy/HighlightPolicy";
import HighlightSection from "./HighlightSection/HighlightSection";
import ProductsCategories from "./ProductsCategories/ProductsCategories";

const Home = () => {
  return (
    <div>
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
