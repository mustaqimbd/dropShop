import React from 'react'
import RatingSection from './AddToCardDetailsSections/RatingSection'
import { AddToCardDetailsProductTitle, AvailabilityTitle, BrandTitle, CategoryTitle, CategoryTitles, ColorTitle, MaximamProfitPrice, MaximumProfitMarginText, ResellerPriceTitle, SkuTitle } from '../titles/FeatureTitle'
import { Button, Typography } from '@mui/material'
import AddToCardProductDetailsConfig, { DividerProduct } from './AddToCardDetailsSections/AddToCardProductDetailsConfig'
import { LockIcon } from '../icons/Icons'
import { BsPlusLg } from 'react-icons/bs'
import { AiOutlineHeart, AiOutlineMinus, AiOutlineShoppingCart } from 'react-icons/ai'
import { BiRefresh } from 'react-icons/bi'

const AddToCardDetails = () => {
    return (
        <div className='flex flex-col gap-3'>
            <RatingSection />
            <AddToCardDetailsProductTitle title={"Joyroom JR-HL1 Wireless Bluetooth Headset"} />
            <AddToCardProductDetailsConfig />
            <ResellerPriceTitle title={"625"} />
            <DividerProduct />
            <div className='mt-3'>
                <MaximumProfitMarginText text={"Maximum Profit Margin"} />
                <div className='flex justify-between w-full'>
                    <div className='flex justify-between w-1/2 border-gray-300 border py-3 px-4'>
                        <MaximamProfitPrice price={"150"} />
                        <LockIcon />
                    </div>
                    <div>
                        <div className=''>
                            <ColorTitle title={"Color"} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-3 flex gap-6'>
                <div className='w-1/2'>
                    <MaximumProfitMarginText text={"Custom Profit Margin"} />
                    <div className=' border-gray-300 border py-3 px-4'>
                        <MaximamProfitPrice price={"50"} />
                    </div>
                </div>
                <div className='w-1/2'>
                    <MaximumProfitMarginText text={"Size"} />
                    <div className=' border-gray-300 border py-3 px-4'>
                        <MaximamProfitPrice price={"Selected Size"} />
                    </div>
                </div>
            </div>
            <div className='mt-3 flex gap-6'>
                <div className='w-1/2'>
                    <MaximumProfitMarginText text={"Total Amount"} />
                    <div className=' border-gray-300 border py-3 px-4'>
                        <MaximamProfitPrice price={"890 Taka"} />
                    </div>
                </div>
                <div className='w-1/2'></div>
            </div>
            <div className='mt-3'>
                <div className='flex justify-between gap-1'>
                    <div className='border border-gray-400 flex py-4 px-2 gap-5'>
                        <Button variant=''> <BsPlusLg /> </Button>
                        <CategoryTitle title={"1"} />
                        <Button variant=''> <AiOutlineMinus /> </Button>
                    </div>
                    <div>
                        <div className=''>
                            <button className='bg-ratingIcon hover:bg-[#FA8250] py-4 px-14 flex justify-between gap-3 items-center font-bold text-white'> <span className='text-lg'>Add To Cart </span> <span><AiOutlineShoppingCart size={30} /></span>  </button>
                        </div>
                    </div>
                    <div className='border border-ratingIcon hover:border-black '>
                    <button className='text-ratingIcon px-5 py-4 hover:text-black'>BUY NOW</button>
                    </div>
                </div>
            </div>
            <div className='mt-3 flex gap-4'>
               <button className='flex justify-between items-center py-3 px-6 gap-3  hover:border-black'>
                    <AiOutlineHeart size={30}/>
                    Add To Wishlist
               </button>
               <button className='flex justify-between items-center py-3 px-6 gap-3 hover:border-black '> 
               <BiRefresh size={35} /> Add To Compare
               </button>
            </div>
            <div className='mt-5'>
                <div className='border border-gray-300 p-3'>
                    <p className='text-base'>100% guarantee safe checkout</p>
                </div>
            </div>
        </div>
    )
}

export default AddToCardDetails
