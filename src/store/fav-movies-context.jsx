import { createContext, useEffect, useState } from "react";
import {
  fetchFavoriteMovies,
  setFavoriteMovie,
} from "@/services/account-service";
import { CircularProgress } from "@mui/material";

const FavMoviesContext = createContext({
  favMovies: [],
  isFavorite: (id) => {},
  toggleFavMovie: (movie) => {},
});

export const FavMoviesProvider = (props) => {
  const [favMovies, setFavMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const favMovies = await fetchFavoriteMovies();
      setFavMovies(favMovies);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const toggleFavMovie = (movie) => {
    setFavMovies((movies) => {
      const movieIndex = movies.findIndex((m) => m.id === movie.id);

      if (movieIndex !== -1) {
        setFavoriteMovie(movie.id, false);
        const updatedMovies = [...movies];
        updatedMovies.splice(movieIndex, 1);
        return updatedMovies;
      } else {
        setFavoriteMovie(movie.id, true);
        return [...movies, movie];
      }
    });
  };

  const isFavorite = (id) => favMovies.some((m) => m.id === id);

  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <FavMoviesContext.Provider
      value={{
        favMovies,
        isFavorite,
        toggleFavMovie,
        loading,
      }}
    >
      {loading ? <CircularProgress /> : props.children}
    </FavMoviesContext.Provider>
  );
};

export default FavMoviesContext;
