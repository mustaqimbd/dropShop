const TopRate_Card = ({ prd_image, slug, taka }) => {
    return (
      <div className='grid grid-cols-2 items-center p-2 mb-4 ' style={{ background: "white" }}>
        <div >
          <img src={prd_image} alt="product" className="w-3/4 object-cover lg:h-[70px] h-[50px]" />
        </div>
        <div className="w-full flex-col space-between">
          <div className='slug mb-4'>{slug.slice(0,20)}{slug.length>15 && <span>......</span>}</div>
          <div className='taka'>{taka} Taka</div>
        </div>
      </div>
    );
  };
  
  export default TopRate_Card;
  