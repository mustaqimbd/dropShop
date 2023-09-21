import { useNavigate } from "react-router-dom";
import useAuthProvider from "../../hooks/useAuthProvider";

const AdminRoute = ({ children }) => {
  const { user, loading, logOut } = useAuthProvider();
  const navigate = useNavigate();
  if (loading) {
    return <h2>Loading from admin route...</h2>;
  }
  if (user.role === "admin") {
    return children;
  } else {
    logOut();
    return navigate("/");
  }
};

export default AdminRoute;
