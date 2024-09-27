const ProductSliderDetailsCard = ({product}) => {
    
  return (
    <div>
      <img src={product.images[0]?.link} alt="" />
    </div>
  )
}

export default ProductSliderDetailsCard
