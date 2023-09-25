import { useState } from "react";
import ContainerMax from "../../../components/container/ContainerMax";
import { FeatureProduct } from "../../../components/titles/FeatureTitle";
import { FeatureProductCard } from "../../../components/cards/allCards/allCards";
import useAllProducts from "../../../hooks/useAllProducts";
import { PaginationGenaral } from "../../../components/pagination/Pagination";

const FeatureProducts = () => {
  const itemsPerPage = 24; // Number of items per page
  const allProductsLength = 95;
  const [currentPage, setCurrentPage] = useState(0);
  const { allProducts, isLoading } = useAllProducts(currentPage, itemsPerPage);
  const allProductsData = allProducts.products;

  //

  return (
    <ContainerMax>
      <div className="py-10 space-y-5">
        <FeatureProduct title="Feature Products" />

        {isLoading ? (
          <p>Loading....</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 justify-center gap-8">
            {allProductsData?.map((product) => (
              <FeatureProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {allProductsData?.length ? (
          <PaginationGenaral
            allProductsLength={allProductsLength}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
          />
        ) : (
          ""
        )}
      </div>
    </ContainerMax>
  );
};

export default FeatureProducts;
