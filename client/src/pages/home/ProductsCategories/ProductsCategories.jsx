import ContainerMax from "../../../components/container/ContainerMax";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ProductCards } from "../../../components/cards/FeaturedProducts/Cards";
import useGetRequest from "../../../hooks/useGetRequest";

const ProductsCategories = () => {
  const { data } = useGetRequest("categories", "category");
  const categories = data?.payload?.category;
  console.log(data);
  return (
    <ContainerMax>
      <div className="py-7 my-7 border-b">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">Product Categories</h1>
          <button className="font-sans">
            View All <ChevronRightIcon />{" "}
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 mt-12 gap-16">
          {categories?.map((category) => (
            <ProductCards key={category._id} category={category} />
          ))}
        </div>
        <div className="flex justify-center mt-5">
          <button className="font-sans">
            View All Categories <ChevronRightIcon />{" "}
          </button>
        </div>
      </div>
    </ContainerMax>
  );
};

export default ProductsCategories;
