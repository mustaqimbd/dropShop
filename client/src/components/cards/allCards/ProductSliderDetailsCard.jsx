import React from 'react'

const ProductSliderDetailsCard = ({product}) => {
    // console.log(product.images[0]?.link)
  return (
    <div>
      <img src={product.images[0]?.link} alt="" />
    </div>
  )
}

export default ProductSliderDetailsCard
