import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { FavMoviesProvider } from "@/store/fav-movies-context";
import ErrorBoundary from "./ErrorBoundary";
import { setApiAuth } from "@/services/auth-service";
import { checkApiAuth } from "@/utils";
import { CircularProgress } from "@mui/material";



const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const setAuthHandler = async () => {
    await setApiAuth();
    setIsLoggedIn(checkApiAuth);
  };
  
  useEffect(() => {
    setAuthHandler();
  }, []);

  return (
    <div className="App">
      <ErrorBoundary>
        {isLoggedIn ? (
          <FavMoviesProvider>
            <Outlet />
          </FavMoviesProvider>
        ) : (
          <CircularProgress />
        )}
      </ErrorBoundary>
    </div>
  );
};

export default App;
