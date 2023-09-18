import React from 'react'
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css";

const AddToCardCarosoul = () => {
    const onChange = () => { }
    const onClickItem = () => { }
    const onClickThumb = () => { }

    return (
        
        <Carousel showArrows={true} onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb} autoPlay={true} infiniteLoop={true}>
            
            <div><img src="files/tv-1.jpg" /></div>
            <div><img src="files/tv-2.jpg" /></div>
            <div><img src="files/head-1.jfif" /></div>
            <div><img src="files/head-2.webp" /></div>
        </Carousel>
    )
}

export default AddToCardCarosoul
