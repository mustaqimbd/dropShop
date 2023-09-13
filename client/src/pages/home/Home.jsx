import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";
import HighlightPolicy from "./HighlightPolicy/HighlightPolicy";
import HighlightSection from "./HighlightSection/HighlightSection";


const Home = () => {
    return (
        <div>
           
        <FeaturedProducts />
        <div>
        <HighlightSection/>

        </div>
        <HighlightPolicy/>
</div>
    );
};

export default Home;