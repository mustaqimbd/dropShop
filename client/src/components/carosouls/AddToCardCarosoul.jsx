import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const AddToCardCarosoul = () => {
  const onChange = () => {};
  const onClickItem = () => {};
  const onClickThumb = () => {};

  return (
    <div className="">
      <Carousel
        showArrows={true}
        onChange={onChange}
        onClickItem={onClickItem}
        onClickThumb={onClickThumb}
        autoPlay={true}
        infiniteLoop={true}
        className="w-full h-64 "
      >
        <div className="w-full">
          <img className="" src="files/tv-1.jpg" />
        </div>
        <div className="w-full">
          <img className="" src="files/tv-2.jpg" />
        </div>
        <div className="w-full">
          <img className="" src="files/head-1.jfif" />
        </div>
        <div className="w-full">
          <img className="" src="files/head-2.webp" />
        </div>
      </Carousel>
    </div>
  );
};

export default AddToCardCarosoul;
