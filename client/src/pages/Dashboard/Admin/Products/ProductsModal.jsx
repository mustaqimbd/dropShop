import { Avatar, IconButton } from "@mui/material";
import CustomModal from "../../../../components/CustomModal/CustomModal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const ProductsModal = ({ open, setOpen, searchProduct, handleDelete }) => {
  const { product_name, images, total_sold, available_quantity, product_id } =
    searchProduct.payload.singleProduct;
  return (
    <CustomModal open={open} setOpen={setOpen}>
      <div className="space-y-3">
        <h2 className="font-bold text-xl">{product_name}</h2>
        <Avatar src={images[0].link} alt={product_name} />
        <div>
          <h2 className="font-bold">
            Total sold : <span className="text-caption">{total_sold}</span>
          </h2>
          <h2 className="font-bold">
            Stock : <span className="text-caption">{available_quantity}</span>
          </h2>
        </div>
        <div className="flex justify-end">
          <div>
            <IconButton color="error2" onClick={() => handleDelete(product_id)}>
              <DeleteIcon />
            </IconButton>
            <IconButton>
              <EditIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default ProductsModal;
