import React, { useContext, useEffect, useState } from "react";
import {
  CircularProgress,
  Container,
  ImageList,
  MenuItem,
  Select,
} from "@mui/material";
import MoviesGalleryItem from "@/components/MoviesGalleryItem";
import FavMoviesContext from "@/store/fav-movies-context";
import { fetchMoviesByCategory } from "@/services/movies-service";

const MoviesGallery = () => {
  const [movies, setMovies] = useState([]);
  const [filterBy, setFilterBy] = useState("popular");
  const [isLoading, setIsLoading] = useState(true);

  const favMoviesCtx = useContext(FavMoviesContext);

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      if (filterBy === "favorites") {
        setMovies(favMoviesCtx.favMovies);
      } else {
        const moviesData = await fetchMoviesByCategory(filterBy);
        setMovies(moviesData);
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const filterChangeHandler = (event) => {
    setFilterBy(event.target.value);
  };
  
  useEffect(() => {
    fetchMovies();
  }, [filterBy]);

  return (
    <Container className="MoviesGallery">
      <div className="MoviesGallery-filter">
        <Select value={filterBy} onChange={filterChangeHandler} autoWidth>
          <MenuItem value={"popular"}>Popular</MenuItem>
          <MenuItem value={"now_playing"}>Now Playing</MenuItem>
          <MenuItem value={"favorites"}>Favorites</MenuItem>
        </Select>
      </div>
      {movies.length ? (
        <ImageList
          className="MoviesGallery-gallery"
          sx={{
            transform: "translateZ(0)",
          }}
          cols={12}
          rowHeight={200}
          gap={1}
        >
          {movies.map((movie) => (
            <MoviesGalleryItem
              key={movie.id}
              movie={movie}
            />
          ))}
        </ImageList>
      ) : isLoading ? (
        <CircularProgress />
      ) : (
        <></>
      )}
    </Container>
  );
};

export default MoviesGallery;
