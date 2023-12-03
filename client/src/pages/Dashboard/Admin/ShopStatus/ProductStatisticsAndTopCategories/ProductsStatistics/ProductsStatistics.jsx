import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../../../hooks/useAxiosSecure";
import useTotalProducts from "../../../../../../hooks/useTotalProducts";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import FluorescentIcon from "@mui/icons-material/Fluorescent";
import CategoryIcon from "@mui/icons-material/Category";
import { FaBan, FaThumbsUp } from "react-icons/fa";

const ProductsStatistics = () => {
  const totalProducts = useTotalProducts();
  const [axiosSecure] = useAxiosSecure();
  const { data: productsStatistics = {} } = useQuery({
    queryKey: ["products-statistics"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(
          "/api/admin/dashboard/product-statistics"
        );
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      <List>
        <ListItem>
          <ListItemIcon>
            <FluorescentIcon />
          </ListItemIcon>
          <div className="flex justify-between w-full">
            <ListItemText>
              <span className="text-caption font-bold">Total products</span>
            </ListItemText>
            <ListItemText>
              {totalProducts?.data?.payload?.productCount}
            </ListItemText>
          </div>
        </ListItem>
      </List>
      <List>
        <ListItem>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <div className="flex justify-between w-full">
            <ListItemText>
              <span className="text-caption font-bold">Total category</span>
            </ListItemText>
            <ListItemText>
              {productsStatistics?.payload?.totalCategory}
            </ListItemText>
          </div>
        </ListItem>
      </List>
      <List>
        <ListItem>
          <ListItemIcon>
            <FaThumbsUp />
          </ListItemIcon>
          <div className="flex justify-between w-full">
            <ListItemText>
              <span className="text-caption font-bold">In stoke products</span>
            </ListItemText>
            <ListItemText>{productsStatistics?.payload?.inStock}</ListItemText>
          </div>
        </ListItem>
      </List>
      <List>
        <ListItem>
          <ListItemIcon>
            <FaBan />
          </ListItemIcon>
          <div className="flex justify-between w-full">
            <ListItemText>
              <span className="text-caption font-bold">
                Total out of stoke products
              </span>
            </ListItemText>
            <ListItemText>
              {productsStatistics?.payload?.outOfStocks}
            </ListItemText>
          </div>
        </ListItem>
      </List>
    </>
  );
};

export default ProductsStatistics;
