import { useNavigate } from "react-router-dom";
import useAuthProvider from "../../hooks/useAuthProvider";

const ResellerRoute = ({ children }) => {
  const { user, loading, logOut } = useAuthProvider();
  const navigate = useNavigate();
  if (loading) {
    return <h2>Loading from reseller route...</h2>;
  } else if (user.role === "reseller") {
    return children;
  } else {
    logOut();
    return navigate("/");
  }
};

export default ResellerRoute;
