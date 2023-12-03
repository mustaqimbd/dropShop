import { Navigate, useLocation } from "react-router-dom";
import useAuthProvider from "../../hooks/useAuthProvider";
import DashboardSkeleton from "../../pages/Dashboard/DashboardSkeleton/DashboardSkeleton";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuthProvider();
  const location = useLocation();
  if (loading) {
    return <DashboardSkeleton />;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }}></Navigate>;
};

export default PrivateRoute;
