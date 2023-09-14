const TopRate_Card = ({ prd_image, slug, taka }) => {
    return (
      <div className='flex justify-between  items-center p-1 mb-4 ' style={{ background: "white" }}>
        <div >
          <img src={prd_image} alt="product" className="w-[80px] h-[80px] " />
        </div>
        <div className="w-full flex-col justify-between ps-3">
          <div className='font-sans text-heading text-sm mb-4'>{slug}</div>
          <div className='text-sm font-sans text-offBadge'>{taka} Taka</div>
        </div>
      </div>
    );
  };
  
  export default TopRate_Card;
  
