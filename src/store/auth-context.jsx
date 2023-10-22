import { createContext, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { setApiAuth } from "@/services/auth-service";
import { checkApiAuth } from "@/utils";

const AuthContext = createContext({
  isLoggedIn: false,
  loading: false,
});

export const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState([]);
  const [loading, setLoading] = useState(false);

  const setAuthHandler = async () => {
    setLoading(true);
    await setApiAuth();
    setIsLoggedIn(checkApiAuth);
    setLoading(false);
  };

  useEffect(() => {
    setAuthHandler();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loading,
      }}
    >
      {loading ? <CircularProgress /> : props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
