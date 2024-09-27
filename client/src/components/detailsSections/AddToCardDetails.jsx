import React, { useEffect, useState } from 'react'
import RatingSection from './AddToCardDetailsSections/RatingSection'
import { AddToCardDetailsProductTitle, ColorTitle, MaximumProfitMarginText, ResellerPriceTitle, } from '../titles/FeatureTitle'
import AddToCardProductDetailsConfig, { DividerProduct } from './AddToCardDetailsSections/AddToCardProductDetailsConfig'
import { LockIcon } from '../icons/Icons'

import { AiFillHeart } from 'react-icons/ai'
import { BiRefresh } from 'react-icons/bi'
import { paymentMethods } from '../../api/addToCard.api'
import { OutlinedInput } from "@mui/material"
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CounterInput from '../buttons/CounterInput'



const size = ['sm', 'lg', 'xl', 'xxl', 'xxxl']

const AddToCardDetails = () => {
    const [methods, setMethods] = useState([])
    const [age, setAge] = React.useState('');
    const [favourite, setFaourite] = useState(false)
    const [quantity, setQuantity] = useState(0)
    const [productAvailable, setProductAvailable] = useState(5)

    const handleIncrement = () => {
        setQuantity(quantity + 1)
    }
    const handleDecrement = () => {
        setQuantity(quantity - 1)
    }


    const handleChange = (event) => {
        setAge(event.target.value);
    };
    useEffect(() => {
        paymentMethods()
            .then(data => {
                setMethods(data)
            })
    }, [])
    const handleFavourite = () => {
        setFaourite(!favourite)
    }
    return (
        <div className='flex flex-col gap-3'>
            <RatingSection />
            <AddToCardDetailsProductTitle title={"Joyroom JR-HL1 Wireless Bluetooth Headset"} />
            <AddToCardProductDetailsConfig />
            <ResellerPriceTitle title={"625"} />
            <DividerProduct />
            {/* <div className='mt-3'>
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
                            <button className='bg-ratingIcon hover:bg-[#FA8250] py-4 md:px-8  flex md:py-9 justify-between gap-3 items-center font-bold text-white '> <span className='text-lg'>Add To Cart </span> <span><AiOutlineShoppingCart size={30} /></span>  </button>
                        </div>
                    </div>
                    <div className='border border-ratingIcon hover:border-black px-3 py-9 '>
                    <button className='text-ratingIcon  w-full  h-full hover:text-black flex justify-center items-center '>BUY NOW</button>
                    </div>
                </div>
            </div> */}
            <div className='mid-div' id='mid-div'>
                <div className='descripts grid grid-cols-1 md:grid-cols-2 gap-8'>
                    <div>
                        <MaximumProfitMarginText text={"Maximam Profit Margin"} />
                        <div className='relative'>
                            <OutlinedInput color='secondary' fullWidth disabled value={"125 Taka"} />
                            <div className='absolute right-2 top-2'><LockIcon /></div>
                        </div>
                    </div>
                    <div>
                        <ColorTitle title={"Color"} />
                        <div className='grid grid-cols-3 justify-start'>
                            <div className='h-8 w-8 bg-[#858585] rounded-full'></div>
                            <div className='h-8 w-8 bg-[#E0E1E1] rounded-full'></div>
                            <div className='h-8 w-8 bg-[#BA9F88] rounded-full'></div>
                        </div>
                    </div>
                    <div>
                        <MaximumProfitMarginText text={"Customer Profit Margin text"} />
                        <OutlinedInput color='primary' fullWidth disabled value={"50 Taka"} />
                    </div>
                    <div>
                        <MaximumProfitMarginText text={"Size"} />
                        <FormControl sx={{ minWidth: 150 }} style={{ width: '100%' }}>
                            <Select
                                value={age}
                                onChange={handleChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}

                            >
                                {/* <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem> */}
                                {/* <MenuItem value={'null'}><em> choose  a Size </em></MenuItem> */}
                                {
                                    size.map(s => <MenuItem placeholder='sm' value={s} key={s}>{s}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <MaximumProfitMarginText text={"Total"} />
                        <OutlinedInput color='primary' fullWidth disabled value={"890 Taka"} />
                    </div>
                </div>
                <div className='mt-9'>
                    <CounterInput productAvailable={productAvailable} handleIncrement={handleIncrement} handleDecrement={handleDecrement} quantity={quantity} />
                </div>
                <div className='buttons grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>

                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-2'>
                <button className='flex justify-center items-center  gap-3 mt-2 hover:outline-1 outline-slate-500' onClick={handleFavourite}>
                    <AiFillHeart size={30} className={`${favourite && "text-red-700"}`} />
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
                            methods.map(method => <img key={method.id} src={method.img} alt={method.name} />)
                        }
                    </span>
                </div>
            </div>
        </div>
    )
}

export default AddToCardDetails
