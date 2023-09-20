import ContainerFull from "../../../components/container/ContainerFull";
import ContainerMax from "../../../components/container/ContainerMax";

import FilteredSidebar from "./FilteredSidebar";
import FilteredProducts from "./FilteredProducts";

const ProductsByCategory = () => {
  return (
    <ContainerFull>
      <div className="bg-iconBg ">
        <ContainerMax>
          <div className="flex py-10  justify-between gap-5 items-start">
            <div className="w-3/12 ">
              <FilteredSidebar />
            </div>
            <div className="w-full">
              <FilteredProducts />
            </div>
          </div>
        </ContainerMax>
      </div>
    </ContainerFull>
  );
};

export default ProductsByCategory;
