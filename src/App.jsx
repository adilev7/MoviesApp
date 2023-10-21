import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { FavMoviesProvider } from "@/store/fav-movies-context";
import { setApiAuth } from "@/services/auth-service";
import { checkApiAuth } from "@/utils";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const setAuthHandler = async () => {
    setIsLoading(true);
    await setApiAuth();
    setIsLoggedIn(checkApiAuth);
    setIsLoading(false);
  };

  useEffect(() => {
    setAuthHandler();
  }, []);

  return (
    <div className="App">
      {isLoggedIn ? (
        <FavMoviesProvider>
          <Outlet />
        </FavMoviesProvider>
      ) : isLoading ? (
        <CircularProgress />
      ) : <></>}
    </div>
  );
};

export default App;
