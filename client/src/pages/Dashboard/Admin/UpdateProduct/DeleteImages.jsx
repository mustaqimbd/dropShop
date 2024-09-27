import DeleteIcon from "@mui/icons-material/Delete";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
const DeleteImages = ({ product, handleSearch }) => {
  const [axiosSecure] = useAxiosSecure();
  const handleDelete = async id => {
    try {
      await axiosSecure.put(`/admin/dashboard/delete-product-image`, {
        productId: product._id,
        imageId: id,
      });
      handleSearch();
      toast.success("Image deleted successfully.");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <h2 className="dashboard-title mt-5 !mb-0">Delete image</h2>
      <div className="flex gap-3 mt-3">
        {product?.images?.map(image => (
          <div key={image._id} className="w-40 group relative overflow-hidden">
            <img src={image?.link} alt="" />
            <div className="absolute w-full h-full bg-gray-700/50 backdrop-blur-md group-hover:top-0 top-full left-0 transition-all flex justify-center items-center">
              <button onClick={() => handleDelete(image._id)}>
                <DeleteIcon className="!w-10 !h-10 !text-red-700" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeleteImages;
