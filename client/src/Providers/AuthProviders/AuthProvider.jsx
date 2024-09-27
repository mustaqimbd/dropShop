import { createContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [axiosSecure] = useAxiosSecure();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchUser, setFetchUser] = useState(false);

  //logout user
  const logOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  //retrieve user
  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await axiosSecure.get("/user/profile");
        setUser(user?.data?.payload?.userInfo);
        setLoading(false);
      } catch (error) {
        localStorage.removeItem("token");
        console.log(error);
        setLoading(false);
      }
    };
    if (localStorage.getItem("token")) {
      getUser();
    } else {
      setLoading(false);
    }
  }, [axiosSecure, fetchUser]);
  
  const data = {
    user,
    setUser,
    loading,
    logOut,
    fetchUser,
    setFetchUser,
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
