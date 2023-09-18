import React from 'react'
import RatingSection from './AddToCardDetailsSections/RatingSection'
import { AddToCardDetailsProductTitle, AvailabilityTitle, BrandTitle, CategoryTitle, ResellerPriceTitle, SkuTitle } from '../titles/FeatureTitle'
import { Typography } from '@mui/material'
import AddToCardProductDetailsConfig, { DividerProduct } from './AddToCardDetailsSections/AddToCardProductDetailsConfig'

const AddToCardDetails = () => {
    return (
        <div className='flex flex-col gap-3'>
            <RatingSection />
            <AddToCardDetailsProductTitle title={"Joyroom JR-HL1 Wireless Bluetooth Headset"} />
            <AddToCardProductDetailsConfig />
            <ResellerPriceTitle title={"625"} />
            <DividerProduct />
        </div>
    )
}

export default AddToCardDetails
