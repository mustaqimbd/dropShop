
// Add to card pages product details api
export const addToCardDetails =async () =>{
    
}


export const paymentMethods =async () =>{
    const res = await fetch("json/addToCartJson.json")
    const data = await res.json()
    return data
}

export const featuresProductFooter = async () =>{
    const res = await fetch("json/features.json")
    const data = await res.json()
    return data
}