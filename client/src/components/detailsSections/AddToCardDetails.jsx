import React, { useEffect, useState } from 'react'
import RatingSection from './AddToCardDetailsSections/RatingSection'
import { AddToCardDetailsProductTitle, AvailabilityTitle, BrandTitle, CategoryTitle, CategoryTitles, ColorTitle, MaximamProfitPrice, MaximumProfitMarginText, ResellerPriceTitle, SkuTitle } from '../titles/FeatureTitle'
import { Button, Typography } from '@mui/material'
import AddToCardProductDetailsConfig, { DividerProduct } from './AddToCardDetailsSections/AddToCardProductDetailsConfig'
import { LockIcon } from '../icons/Icons'
import { BsPlusLg } from 'react-icons/bs'
import { AiOutlineHeart, AiOutlineMinus, AiOutlineShoppingCart } from 'react-icons/ai'
import { BiRefresh } from 'react-icons/bi'
import { paymentMethods } from '../../api/addToCard.api'

const AddToCardDetails = () => {
    const [methods, setMethods] = useState([])
    useEffect(()=>{
        paymentMethods()
        .then(data =>{
            setMethods(data)
        })
    },[])

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
                <div className='grid grid-cols-1  lg:grid-cols-3 gap-2'>
                    <div className='border border-gray-400 flex py-4 -px-3 md:px-0 lg:px-4  justify-between items-center w-full'>
                        <Button variant=''> <BsPlusLg /> </Button>
                        <CategoryTitle title={"1"} />
                        <Button variant=''> <AiOutlineMinus /> </Button>
                    </div>
                    <div>
                        <div className=''>
                            <button className='bg-ratingIcon hover:bg-[#FA8250] py-4 md:px-8 flex md:py-6 justify-between gap-3 items-center font-bold text-white '> <span className='text-lg'>Add To Cart </span> <span><AiOutlineShoppingCart size={30} /></span>  </button>
                        </div>
                    </div>
                    <div className='border border-ratingIcon hover:border-black px-3 py-9 '>
                    <button className='text-ratingIcon  w-full  h-full hover:text-black flex justify-center items-center '>BUY NOW</button>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-2'>
               <button className='flex justify-center items-center  gap-3 mt-2 hover:outline-1 outline-slate-500'>
                    <AiOutlineHeart size={30}/>
                    Add To Wishlist
               </button>
               <button className='flex justify-center items-center  gap-3 border-black  mt-2'> 
               <BiRefresh size={35} /> Add To Compare
               </button>
            </div>
            <div className='mt-5'>
                <div className='border border-gray-300 p-3'>
                    <p className='text-base mb-2'>100% guarantee safe checkout</p>
                    <span className='grid grid-cols-5 md:grid-cols-10  gap-2'>
                    {
                        methods.map(method => <img key={method.id} src={method.img} alt={method.name} /> )
                    }
                    </span>
                </div>
            </div>
        </div>
    )
}

export default AddToCardDetails
