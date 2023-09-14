import React from 'react'
import { CategoryTitles } from '../../titles/TitlesGazi'
import { CategoryImg } from '../../avaters/Avatars'

const FeaturedCarts = ({category}) => {
    console.log(category)
  return (
    <div className='text-center flex flex-col justify-center items-center cursor-pointer gap-1 rounded-3xl'>
      <CategoryImg src={category.img}/>
      <CategoryTitles title={category.name}/>
    </div>
  )
}

export default FeaturedCarts
