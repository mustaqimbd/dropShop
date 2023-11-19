import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./slider.css";
import { PrimaryButton } from "../../../../components/buttons/Buttons";

const Slider = ({ products }) => {
  console.log(products);
  return (
    <div className="bg-gray-100 p-2 md:p-10 rounded-md">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {products?.slice(0, 3).map(product => (
          <SwiperSlide key={product._id}>
            <div className="p-5 md:p-10 bg-gray-100">
              <div className="flex gap-5 items-center">
                <div className="flex-1 text-start space-y-1 md:space-y-3">
                  <h2 className="text-md md:text-2xl font-bold">
                    {product?.product_name}
                  </h2>
                  <p className="text-xs md:text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Distinctio laborum est accusamus consectetur.
                  </p>
                  <div className="w-max">
                    <PrimaryButton title="Shop now" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <img
                      src={product?.images[0]?.link}
                      alt=""
                      className="!w-56 !h-56 aspect-square object-contain"
                    />
                    <div className="absolute w-10 h-10 md:w-20 md:h-20 bg-priceBadge top-0 right-0 rounded-full border-2 md:border-4 border-white flex justify-center items-center md:translate-x-10 md:-translate-y-10">
                      <span className="text-white font-bold text-xs md:text-xl">
                        $ {product.reseller_price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
