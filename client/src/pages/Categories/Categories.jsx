import { ProductCards } from '../../components/cards/FeaturedProducts/Cards';
import useGetRequest from '../../hooks/useGetRequest';

const Categories = () => {
    const { data } = useGetRequest("categories", "category");
    const categories = data?.payload?.category;
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 my-12 gap-16">
            {categories?.map(category => (
                <ProductCards key={category._id} category={category} />
            ))}
        </div>
    );
};

export default Categories;