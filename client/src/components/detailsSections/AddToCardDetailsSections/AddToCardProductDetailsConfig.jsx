import { Divider } from '@mui/material'
import React from 'react'

const AddToCardProductDetailsConfig = () => {
    return (
        <div className='flex justify-between mt-1'>
            <div className='flex flex-col gap-2'>
                <p className='text-lg font-[600] '><span className='text-[#5F6C72]'>Sku: </span><span>A264671</span></p>
                <p className='text-lg font-[600] '><span className='text-[#5F6C72]'>Brand: </span><span>Joyroom</span></p>
            </div>
            <div className='flex flex-col gap-2'>
                <p className='text-lg font-[600] '><span className='text-[#5F6C72]'>Availability: </span><span className='text-offBadge'>73 In Stock</span></p>
                <p className='text-lg font-[600] '><span className='text-[#5F6C72]'>Category: </span><span >headphone</span></p>
            </div>
        </div>
    )
}
export const DividerProduct = () =>{
    return <div className='mt-3'><Divider /></div>
}

export default AddToCardProductDetailsConfig
