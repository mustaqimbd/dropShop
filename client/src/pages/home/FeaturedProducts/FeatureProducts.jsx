import { useState } from "react";
import ContainerMax from "../../../components/container/ContainerMax";
import { FeatureProduct } from "../../../components/titles/FeatureTitle";
import { FeatureProductCard } from "../../../components/cards/allCards/allCards";
import useAllProducts from "../../../hooks/useAllProducts";

const FeatureProducts = () => {
  const itemsPerPage = 24; // Number of items per page
  const [currentPage, setCurrentPage] = useState(0);
  // Default state is an empty array
  const { allProducts, isLoading } = useAllProducts(currentPage, itemsPerPage);
  const allProductsData = allProducts.products;
  const allProductsLength = 95;
  // Calculate total pages and indices for pagination
  const totalPages = Math.ceil(allProductsLength / itemsPerPage);

  console.log("total page:", totalPages);
  console.log("current page page:", currentPage);

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
          <div className="mt-8 flex justify-center items-center space-x-4">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 0}
              className={`px-4 py-2 rounded-md ${
                currentPage === 0
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-primary text-white hover:bg-blue-600"
              }`}
            >
              Previous
            </button>

            {/* Page numbers */}
            <div className="flex space-x-2">
              {[...Array(totalPages).keys()].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-full ${
                    currentPage === page
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-blue-200"
                  }`}
                >
                  {page + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage + 1 === totalPages}
              className={`px-4 py-2 rounded-md ${
                currentPage + 1 === totalPages
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-primary text-white hover:bg-blue-600"
              }`}
            >
              Next
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </ContainerMax>
  );
};

export default FeatureProducts;
