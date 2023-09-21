import React, { useEffect, useState } from 'react'
import { featuresProductFooter } from '../../api/addToCard.api'

const AddToCartProductDescriptionFeature = () => {
    const [features, setFeatures] = useState([])
    useEffect(()=>{
        featuresProductFooter()
        .then(data =>{
            // console.log("ADD TO CART", data)
            setFeatures(data)
        })
    },[])
  return (
    <div>
      <p className='text-xl font-semibold mb-5'>Features</p>
      <div className='flex flex-col gap-4'>
      {
        features.map((feature,index) => <div key={index} className='flex gap-3'>
          <span className='' style={{width: "30px", height: "30px"}}><img src={feature.icon} alt="" style={{objectFit: "cover", width: "100%", height: "100%"}} /> </span> 
          <span> <p className='text-[18px] font-medium text-justify' style={{lineHeight: "20px"}}>{feature.desc}</p> </span> 
        </div> )
      }
      </div>
    </div>
  )
}

export default AddToCartProductDescriptionFeature
