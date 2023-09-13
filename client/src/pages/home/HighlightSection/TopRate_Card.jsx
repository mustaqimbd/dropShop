
const TopRate_Card = ({prd_image,slug,taka}) => {
    return (
        
        <div className='flex gap-3 items-center justify-center p-2 mb-4'style={{background:"white"}}>
        <div><img src={prd_image} style={{height:"70px",width:"70px"}} alt="product"/></div>
        <div> <div className='slug'>{slug.slice(0,45)} {slug.length==42 || <div>.....</div>}</div>   <div className='taka'>{taka} Taka</div>           </div>
        </div>
    );
};

export default TopRate_Card;