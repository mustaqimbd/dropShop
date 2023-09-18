import React from 'react'
import RatingSection from './AddToCardDetailsSections/RatingSection'
import { AddToCardDetailsProductTitle, AvailabilityTitle, BrandTitle, CategoryTitle, ColorTitle, MaximamProfitPrice, MaximumProfitMarginText, ResellerPriceTitle, SkuTitle } from '../titles/FeatureTitle'
import { Typography } from '@mui/material'
import AddToCardProductDetailsConfig, { DividerProduct } from './AddToCardDetailsSections/AddToCardProductDetailsConfig'
import { LockIcon } from '../icons/Icons'

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

        </div>
    )
}

export default AddToCardDetails
