
import HighlightPolicy from "./HighlightPolicy/HighlightPolicy";
import HighlightSection from "./HighlightSection/HighlightSection";
import ProductsCategories from "./ProductsCategories/ProductsCategories";


const Home = () => {
    return (
        <div>
           
        <ProductsCategories />
        <div>
        <HighlightSection/>

        </div>
        <HighlightPolicy/>
</div>
    );
};

export default Home;