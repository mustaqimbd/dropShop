import { useEffect, useState } from "react";

import ContainerFull from "../../../components/container/ContainerFull";
import ContainerMax from "../../../components/container/ContainerMax";
import HighLightedProductsCard from "../../../components/cards/highLightSectionCard/HighLightedProductsCard";
import { PrimaryButton } from "../../../components/buttons/Buttons";
import { NavLink } from "react-router-dom";
const HighlightSection = () => {
  const [topRate, setTopRate] = useState([]);
  const [topSelling, setTopSelling] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/products/highlight-products`)
      .then(res => res.json())
      .then(data => {
        setTopRate(data.payload.topRatedProducts);
        setTopSelling(data.payload.topSellingProducts);
      });
  }, []);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("category.json")
      .then(res => res.json())
      .then(data => {
        setCategories(data);
      });
  }, []);

  return (
    <ContainerFull>
      <div className="bg-iconBg py-20">
        <ContainerMax>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 justify-between gap-6">
            <div className="space-y-4">
              <h1 className="uppercase font-semibold">top Rated</h1>
              <div className="flex-1 space-y-4">
                {topRate.map((item, index) => (
                  <HighLightedProductsCard
                    key={index}
                    content={item}
                  ></HighLightedProductsCard>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="uppercase font-semibold">top Rated</h1>
              <div className="grid grid-cols-1 gap-3">
                {topSelling.map((item, index) => (
                  <HighLightedProductsCard
                    key={index}
                    content={item}
                  ></HighLightedProductsCard>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="uppercase font-semibold">Popular Category</h1>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category, index) => (
                  <NavLink to={`/product-category/${category?.slug}`} key={index} className=" px-2 py-1 border-[1px] border-borderColor">
                    <span
                    >
                      {category.name}{" "}
                    </span>
                  </NavLink>
                ))}
              </div>
            </div>
            <div className="space-y-4 bg-[#124261] rounded-md flex justify-center align-middle">
              <div className="text-white flex justify-center items-center flex-col gap-3 ">
                <span className="uppercase bg-[#2f5974]  px-3 py-2">
                  Summer Sale
                </span>
                <h1 className="uppercase text-3xl font-semibold">
                  {" "}
                  30 % Discount{" "}
                </h1>
                <h1>
                  only for{" "}
                  <span className="text-[#EBC80C] text-xl">Smart Phone </span>{" "}
                  Products
                </h1>
                <PrimaryButton title={"Shop Now"} />
              </div>
            </div>
          </div>
        </ContainerMax>
      </div>
    </ContainerFull>
  );
};

export default HighlightSection;
