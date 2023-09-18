import { createContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export const AuthContext = createContext();
export const baseUrl = "http://localhost:5000";
const AuthProvider = ({ children }) => {
  const [axiosSecure] = useAxiosSecure();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const data = {
    user,
    setUser,
    loading,
    baseUrl,
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await axiosSecure.get("/api/user/profile");
        setUser(user?.data?.payload?.userInfo);
      } catch (error) {
        localStorage.removeItem("token");
        console.log(error);
      }
    };
    if (localStorage.getItem("token")) {
      getUser();
    }
    setLoading(false);
  }, [axiosSecure]);
  console.log(user);
  // console.log(loading);
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
