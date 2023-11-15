import { useParams } from "react-router-dom";
import ContainerFull from "../../../components/container/ContainerFull";
import ContainerMax from "../../../components/container/ContainerMax";

import FilteredSidebar from "./FilteredSidebar";
import FilteredProducts from "./FilteredProducts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ProductsByCategory = () => {
  const { category } = useParams();
  // const { data: products } = useQuery({
  //   queryKey: ["product-by-category"],
  //   queryFn:async()=>{
  //     try {
  //       const res=await axios.get(`/api/category/`)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  // });
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
