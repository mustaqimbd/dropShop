const CategoryImg = ({ src }) => {
  return (
    <div className="bg-['#F2F4F5] h-32 w-32 rounded-full p-4">
      <img src={src} alt="" className="bg-transparent object-cover rounded-full"/>
    </div>
  );
};

export { CategoryImg };
