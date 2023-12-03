import { Button } from "@mui/material";
import { PrimaryButton } from "../../../components/buttons/Buttons";
import ContainerMax from "../../../components/container/ContainerMax";
import useGetRequest from "../../../hooks/useGetRequest";
import Slider from "./slider/Slider";

const Hero = () => {
  const { data } = useGetRequest("banner-products", "products/banner-products");
  const products = data?.payload?.products;
  const forth = products?.slice(3, 4)[0];
  const fifth = products?.slice(4, 5)[0];

  return (
    <ContainerMax>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="col-span-1 md:col-span-2">
          <Slider products={products} />
        </div>
        <div className="col-span-1 flex flex-col gap-3">
          <div className="bg-gray-900 !pr-0 !pb-0 p-2 md:p-5 rounded-md h-1/2 flex gap-2 relative">
            <div className="flex-1 flex flex-col justify-center gap-2">
              <p className="text-amber-500 font-bold text-xs">HOT DEALS</p>
              <h2 className="text-white font-bold">{forth?.product_name}</h2>
              <div className="w-max">
                <PrimaryButton title="Shop now" />
              </div>
            </div>
            <div className="flex-1 overflow-hidden flex justify-end ">
              <img
                src={forth?.images[0]?.link}
                alt=""
                className="w-52 h-52 object-cover  rounded-md"
              />
            </div>
            {forth?.discount ? (
              <div className="absolute right-10 -translate-y-2">
                <Button
                  variant="contained"
                  className="!bg-amber-400 !font-bold"
                >
                  {forth?.discount}% OFF
                </Button>
              </div>
            ) : null}
          </div>
          <div className="!pr-0 !pb-0 p-2 md:p-5 rounded-md h-1/2 flex justify-center items-center gap-2 bg-gray-100">
            <div className="flex-1 flex justify-center">
              <img src={fifth?.images[0]?.link} className="w-28 h-28" />
            </div>
            <div className="flex-1 space-y-2">
              <h2 className="font-bold">{fifth?.product_name}</h2>
              <p className="text-priceBadge font-bold">
                ${fifth?.reseller_price}
              </p>
              <div className="w-max">
                <PrimaryButton title="Shop now" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContainerMax>
  );
};

export default Hero;
