import React from 'react'


import { CategoryImg } from '../../avaters/Avatars'
import { CategoryTitles } from '../../titles/FeatureTitle'

const ProductCards = ({category}) => {
    // console.log(category)
  return (
    <div className='text-center flex flex-col justify-center items-center cursor-pointer gap-5 rounded-3xl'>
      <CategoryImg src={category.img}/>
      <CategoryTitles title={category.name}/>
    </div>
  )
}

export {
  ProductCards
}
