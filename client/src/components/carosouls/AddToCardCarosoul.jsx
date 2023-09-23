import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const AddToCardCarosoul = () => {
  const onChange = () => {};
  const onClickItem = () => {};
  const onClickThumb = () => {};

  return (
    <Carousel
      showArrows={true}
      onChange={onChange}
      onClickItem={onClickItem}
      onClickThumb={onClickThumb}
      autoPlay={true}
      infiniteLoop={true}
    >
      <div className="h-[464px] w-full">
        <img
          src="files/carHeadphone1.png"
          className="object-fill object-center"
        />
      </div>
      <div className="h-[464px] w-full">
        <img
          src="files/carHeadphone2.png"
          className="object-fill object-center"
        />
      </div>
      <div className="h-[464px] w-full">
        <img
          src="files/carHeadphone3.png"
          className="object-fill object-center"
        />
      </div>
    </Carousel>
  );
};

export default AddToCardCarosoul;
