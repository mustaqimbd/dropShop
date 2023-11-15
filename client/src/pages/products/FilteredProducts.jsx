import { useState } from "react";
import { CategoriesProductCard } from "../../components/cards/allCards/allCards";
import ContainerFull from "../../components/container/ContainerFull";

import { PaginationGenaral } from "../../components/pagination/Pagination";

import useAllProducts from "../../hooks/useAllProducts";

const FilteredProducts = () => {
  const itemsPerPage = 24; // Number of items per page
  const allProductsLength = 95;
  const [currentPage, setCurrentPage] = useState(0);
  const { allProducts, isLoading } = useAllProducts(currentPage, itemsPerPage);
  const allProductsData = allProducts.products;

  //

  return (
    <ContainerFull>
      <div className="space-y-5">
        {isLoading ? (
          <p>Loading....</p>
        ) : (
          <div className="grid   grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4    gap-8">
            {allProductsData?.map(product => (
              <CategoriesProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        <div className="flex justify-end">
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
      </div>
    </ContainerFull>
  );
};

export default FilteredProducts;
