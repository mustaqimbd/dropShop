import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';
import { getFeaturedProducts } from '../../../api/products';
import ProductSliderDetailsCard from '../../cards/allCards/ProductSliderDetailsCard';

const AddToCartSwiper = () => {
    const [products, setProducts] = useState([])
    useEffect(()=>{
        getFeaturedProducts()
        .then(data =>{
            setProducts(data)
        })
    },[])
  return (
    <div>
      <Swiper
        slidesPerView={4}
        centeredSlides={false}
        spaceBetween={30}
        grabCursor={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        autoplay={true}
        loop={true}
      >
        {
            products.map(product => <SwiperSlide key={product._id}>
                <ProductSliderDetailsCard product={product}/>
            </SwiperSlide>)
        }
        
        
      </Swiper>
    </div>
  )
}

export default AddToCartSwiper
