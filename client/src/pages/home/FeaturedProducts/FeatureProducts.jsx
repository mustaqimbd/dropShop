import { useState } from "react";
import ContainerMax from "../../../components/container/ContainerMax";
import { FeatureProduct } from "../../../components/titles/FeatureTitle";
import { FeatureProductCard } from "../../../components/cards/allCards/allCards";
import { PaginationGeneral } from "../../../components/pagination/Pagination";
import useGetRequest from "../../../hooks/useGetRequest";

const FeatureProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;
  const { data, isLoading } = useGetRequest(
    "featured-products",
    `products/products-by-pagination?page=${currentPage}&limit=${itemsPerPage}`
  );
  const products = data?.payload?.products;

  return (
    <ContainerMax>
      <div className="py-10 space-y-5">
        <FeatureProduct title="Feature Products" />

        {isLoading ? (
          <p>Loading....</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 justify-center gap-8">
            {products?.map(product => (
              <FeatureProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {products?.length ? (
          <PaginationGeneral
            allProductsLength={data?.payload?.count}
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
