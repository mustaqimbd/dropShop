
// get featured products 
export const getFeaturedProducts = async () =>{
    const res = await fetch("featureProucts.json");
    const data = await res.json();
    return data
}

