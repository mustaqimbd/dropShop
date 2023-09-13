import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";
import HighlightPolicy from "./HighlightPolicy/HighlightPolicy";
import HighlightSection from "./HighlightSection/HighlightSection";


const Home = () => {
    return (
        <div>
            This is Home 
        <FeaturedProducts />
        <div>
        <HighlightSection/>

        </div>
        <HighlightPolicy/>
</div>
    );
};

export default Home;