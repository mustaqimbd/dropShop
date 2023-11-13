import ContainerFull from "../../components/container/ContainerFull";
import ContainerMax from "../../components/container/ContainerMax";
import FilteredSidebar from "./FilteredSidebar";
import { useParams } from "react-router-dom";
import useGetRequest from "../../hooks/useGetRequest";
import { CategoriesProductCard } from "../../components/cards/allCards/allCards";
import { PaginationGenaral } from "../../components/pagination/Pagination";
import { useState } from "react";

const ProductsByCategory = () => {
  const categorySlug = useParams()?.slug;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { data } = useGetRequest(
    categorySlug,
    `products/${categorySlug}?page=${currentPage}&limit=${itemsPerPage}`
  );
  const products = data?.payload?.products;

  return (
    <ContainerFull>
      <div className="bg-iconBg ">
        <ContainerMax>
          <div className="flex py-10  justify-between gap-5 items-start">
            <div className="w-3/12 ">
              <FilteredSidebar />
            </div>
            <div className="w-full">
              <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4    gap-8">
                {data?.payload?.products?.map((product) => (
                  <CategoriesProductCard key={product._id} product={product} />
                ))}
              </div>
              <div className="flex justify-end">
                {products?.length ? (
                  <PaginationGenaral
                    allProductsLength={data?.payload?.count}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </ContainerMax>
      </div>
    </ContainerFull>
  );
};

export default ProductsByCategory;
