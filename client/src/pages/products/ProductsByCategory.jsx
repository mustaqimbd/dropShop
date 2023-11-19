import ContainerFull from "../../components/container/ContainerFull";
import ContainerMax from "../../components/container/ContainerMax";
import FilteredSidebar from "./FilteredSidebar";
import { useParams } from "react-router-dom";
import useGetRequest from "../../hooks/useGetRequest";
import { CategoriesProductCard } from "../../components/cards/allCards/allCards";
import { PaginationGeneral } from "../../components/pagination/Pagination";
import { useEffect, useState } from "react";

const ProductsByCategory = () => {
  const categorySlug = useParams()?.slug;
  const [currentPage, setCurrentPage] = useState(1);
  const [fpCurrentP, setFpCurrentP] = useState(1); //fpCurrentP= filtered products current page
  const [productsInfo, setProductsInfo] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredProductsCount, setFilteredProductsCount] = useState([]);
  const itemsPerPage = 10;
  const { data } = useGetRequest(
    categorySlug,
    `products/${categorySlug}?page=${currentPage}&limit=${itemsPerPage}`
  );
  useEffect(() => {
    setProductsInfo(data);
  }, [data]);
  const products = productsInfo?.payload?.products;
  return (
    <ContainerFull>
      <div className="bg-iconBg">
        <ContainerMax>
          <div className="grid grid-cols-1 md:grid-cols-4 py-10 justify-between gap-5 items-start">
            <div className="col-span-1">
              <FilteredSidebar
                setProductsInfo={setProductsInfo}
                setFilteredProducts={setFilteredProducts}
                categoryDetails={data?.payload?.categoryDetails}
                setFilteredProductsCount={setFilteredProductsCount}
                fpCurrentP={fpCurrentP}
                setFpCurrentP={setFpCurrentP}
              />
            </div>
            <div className="col-spam-1 md:col-span-3">
              {products ? (
                <div className="w-full">
                  <div className="flex flex-wrap gap-5 justify-center">
                    {products?.map(product => (
                      <CategoriesProductCard
                        key={product._id}
                        product={product}
                      />
                    ))}
                  </div>
                  <div className="flex justify-end">
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
                </div>
              ) : (
                ""
              )}

              {filteredProducts?.length ? (
                <div className="w-full">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4 gap-8">
                    {filteredProducts?.map(product => (
                      <CategoriesProductCard
                        key={product._id}
                        product={product}
                      />
                    ))}
                  </div>
                  <div className="flex justify-end">
                    {filteredProducts?.length ? (
                      <PaginationGeneral
                        allProductsLength={filteredProductsCount}
                        currentPage={fpCurrentP}
                        setCurrentPage={setFpCurrentP}
                        itemsPerPage={itemsPerPage}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </ContainerMax>
      </div>
    </ContainerFull>
  );
};

export default ProductsByCategory;
