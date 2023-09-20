import { Navigate, useLocation } from "react-router-dom";
import useAuthProvider from "../../hooks/useAuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuthProvider();
  const location = useLocation();
  if (loading) {
    return <h2>Loading from private route...</h2>;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }}></Navigate>;
};

export default PrivateRoute;
