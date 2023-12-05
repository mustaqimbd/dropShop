import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const ImagesCarousel = ({ images }) => {
 
  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      showArrows={false}
      thumbWidth={60}
      dynamicHeight={false}
      showIndicators={false}
      className="text-center"
    >
      {images?.map((image) => {
        return (
          <div key={image?._id} className="h-[600px] w-[600px] mt-10">
            <img
              src={image?.link}
              className="w-full h-full"
              alt="Your Alt Text"
            />
          </div>
        );
      })}
    </Carousel>
  );
};

export default ImagesCarousel;
