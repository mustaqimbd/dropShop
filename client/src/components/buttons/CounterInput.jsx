import React, { useEffect, useState } from 'react'

const CounterInput = ({handleIncrement, handleDecrement, quantity, productAvailable}) => {
    const [maxLimit, setMaxLimit] = useState(false)
    
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <div className='outline-2 outline-slate-500'>
                <div className="custom-number-input h-10 w-32">
                    <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                        <button data-action="decrement" className="  text-gray-600   h-full w-20 rounded-l cursor-pointer outline-none" onClick={handleDecrement} disabled={quantity==0}>
                            <span className="m-auto text-2xl font-thin">−</span>
                        </button>
                        <input type="number" className=" focus:outline-none text-center w-full  font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none" name="custom-input-number" value={quantity}></input>
                        <button onClick={handleIncrement} data-action="increment" className=" text-gray-600   h-full w-20 rounded-r cursor-pointer" disabled={quantity === productAvailable}>
                            <span className="m-auto text-2xl font-thin">+</span>
                        </button>
                    </div>
                </div>
            </div>
            <div>
                Add to card section
            </div>
            <div>

            </div>
        </div>
    )
}

export default CounterInput
