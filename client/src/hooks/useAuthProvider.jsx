import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders/AuthProvider";

const useAuthProvider = () => {
  const data = useContext(AuthContext);
  return data;
};

export default useAuthProvider;
