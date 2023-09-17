import React, { useEffect, useState } from 'react'
import ContainerMax from '../../../components/container/ContainerMax'
import { FeatureProduct } from '../../../components/titles/FeatureTitle'
import { getFeaturedProducts } from '../../../api/products'
import { FeatureProductCard } from '../../../components/cards/allCards/allCards'

const FeatureProductSection = () => {
    const [featuredProducts, setFeaturedProducts] = useState([])
    useEffect(()=>{
        getFeaturedProducts()
        .then(data =>{
           setFeaturedProducts(data)
        })
        
    },[])
  return (
    <ContainerMax>
        <div>
            <FeatureProduct title="Feature Products"/>

        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 justify-center gap-7'>
            {
                featuredProducts.map(product => <FeatureProductCard key={product._id} product={product}/> )
            }
        </div>
    </ContainerMax>
  )
}

export default FeatureProductSection
