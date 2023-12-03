
const Video = ({video,id}) => {
    return (
        <div className='lg:w-2/4 w-full flex justify-center mx-auto mt-10 rounded-lg px-5 py-20' id={id}>
        <video src={video} muted autoPlay loop className='rounded-lg' />
  </div>
    );
};

export default Video;