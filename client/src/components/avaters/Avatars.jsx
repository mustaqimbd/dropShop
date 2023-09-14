const CategoryImg = ({ src }) => {
  return (
    <div className="h-32 w-32 rounded-full p-4 bg-gray-50 hover:bg-slate-100">
    <img src={src} alt="" className="object-cover "/>
  </div>
  );
};

export { CategoryImg };
