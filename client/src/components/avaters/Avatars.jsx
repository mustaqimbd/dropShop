const CategoryImg = ({ src }) => {
  return (
    <div className="h-32 w-32 rounded-full p-4 bg-gray-100 hover:bg-slate-200 transition-all">
      <img src={src} alt="" className="object-cover " />
    </div>
  );
};
const HighLightProductImg = ({ src }) => {
  return (
    <div className="h-20  w-32   ">
      <img src={src} alt="" className="  h-20  w-32  object-cover " />
    </div>
  );
};

const FeaturedProductImage = ({ src, title }) => {
  return (
    <div className="h-44 w-52 p-5">
      <img src={src} alt={title} className=" object-scale-down" />
    </div>
  );
};

export { CategoryImg, HighLightProductImg, FeaturedProductImage };
