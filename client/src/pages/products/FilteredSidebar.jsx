import { useEffect, useState } from "react";
import FilterByRating, {
  FilterByCheckbox,
  FilterByPrice,
} from "../../components/filtered/FiltereBy";
import { Button } from "@mui/material";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const FilteredSidebar = ({
  categoryDetails,
  setProductsInfo,
  setFilteredProducts,
  setFilteredProductsCount,
  fpCurrentP,
  setFpCurrentP,
}) => {
  const [axiosSecure] = useAxiosSecure();
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [rating, setRating] = useState(0);
  const [checkboxFilters, setCheckboxFilters] = useState([]);
  const handleCheckBoxFilterChange = filters => {
    const exceptCurrent = checkboxFilters.filter(
      item => item.propsName !== filters.propsName
    );
    setCheckboxFilters([...exceptCurrent, filters]);
  };
  const handleFilterBtn = () => {
    setFpCurrentP(1);
    handleFilters();
  };
  const handleFilters = async currentPage => {
    const sanitizedCheckboxFilter = [];
    for (const checkboxFilter of checkboxFilters) {
      if (checkboxFilter.values.length) {
        sanitizedCheckboxFilter.push(checkboxFilter);
      }
    }
    const filters = {
      priceRange,
      ratings: !rating ? undefined : rating,
      checkboxFilters: sanitizedCheckboxFilter.length
        ? sanitizedCheckboxFilter
        : undefined,
    };
    try {
      const result = await axiosSecure.post(
        `/api/products/product-by-smart-search?category_slug=${categoryDetails?.slug}&currentPage=${currentPage}`,
        filters
      );
      setFilteredProductsCount(result?.data?.payload?.totalCount);
      setFilteredProducts(result?.data?.payload?.result);
      setProductsInfo(null);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleFilters(fpCurrentP);
  }, [fpCurrentP]);
  return (
    <>
      <div className="h-screen space-y-3 w-full z-20 overflow-y-auto overflow-x-hidden">
        <FilterByPrice priceRange={priceRange} setPriceRange={setPriceRange} />
        <FilterByRating rating={rating} setRating={setRating} />
        {categoryDetails?.properties?.map(categoryProps => (
          <FilterByCheckbox
            key={categoryProps?._id}
            title={`${categoryProps?.propertyName}`}
            options={categoryProps?.values}
            handleCheckBoxFilterChange={handleCheckBoxFilterChange}
          />
        ))}
        <Button variant="contained" onClick={handleFilterBtn}>
          Filter
        </Button>
      </div>
    </>
  );
};

export default FilteredSidebar;
