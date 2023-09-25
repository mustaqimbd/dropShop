import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Hidden from '@mui/material/Hidden';

const CounterInput = ({ handleIncrement, handleDecrement, quantity, productAvailable }) => {
    const [maxLimit, setMaxLimit] = useState(false)

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 items-center'>
            <div className='outline-2 outline-slate-500'>
                <div className="custom-number-input h-10 w-32">
                    <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                        <button data-action="decrement" className="  text-gray-600   h-full w-20 rounded-l cursor-pointer outline-none" onClick={handleDecrement} disabled={quantity == 0}>
                            <span className="m-auto text-2xl font-thin">−</span>
                        </button>
                        <input type="number" className=" focus:outline-none text-center w-full  font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none" name="custom-input-number" value={quantity}></input>
                        <button onClick={handleIncrement} data-action="increment" className=" text-gray-600   h-full w-20 rounded-r cursor-pointer" disabled={quantity === productAvailable}>
                            <span className="m-auto text-2xl font-thin">+</span>
                        </button>
                    </div>
                </div>
            </div>
            <div >
            <Button
      variant="contained"
      color="warning"
      style={{
        color: 'white',
        width:'100%' // Vertically center the content
      }}
    >
      Add to Cart
      <ShoppingCartIcon style={{ marginLeft: '8px' }} />
    </Button>

            </div>
            <div>
                <Button
                    variant="outlined"
                    color="warning" // Customize color as "orange" (Material-UI warning color)
                    fullWidth // Make the button span the full width
                    style={{ color: 'orange', borderColor: 'orange' }} // Customize text and border color
                >
                    Buy Now
                </Button>
            </div>
        </div>
    )
}

export default CounterInput
