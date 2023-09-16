const CategoryImg = ({ src }) => {
  return (
    <div className="h-32 w-32 rounded-full p-4 bg-gray-50 hover:bg-slate-100">
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

export { CategoryImg, HighLightProductImg };
