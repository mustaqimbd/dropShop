import React, { useEffect } from 'react'
import AddToCartProductDescriptionFooter from '../../description/AddToCartProductDescriptionFooter'
import AddToCartProductDescriptionFeature from '../../description/AddToCartProductDescriptionFeature'
import ShippingInformation from '../../description/ShippingInformation'


const AddCartDescription = () => {
    useEffect(()=>{
        // fetch the data of product details + Product Features + Shipping status
    },[])
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
      <div className='col-span-2'>
        <AddToCartProductDescriptionFooter />
      </div>
      <div className='col'>
        <AddToCartProductDescriptionFeature />
      </div>
      <div className='col'>
        <ShippingInformation />
      </div>
    </div>
  )
}

export default AddCartDescription
