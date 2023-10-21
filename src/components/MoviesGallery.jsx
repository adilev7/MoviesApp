import React, { useContext, useEffect, useState } from "react";
import {
  CircularProgress,
  Container,
  ImageList,
  MenuItem,
  Pagination,
  Select,
  Stack,
} from "@mui/material";
import MoviesGalleryItem from "@/components/MoviesGalleryItem";
import FavMoviesContext from "@/store/fav-movies-context";
import { fetchMoviesByCategory } from "@/services/movies-service";
import ErrorBoundary from "@/ErrorBoundary";
import { API_PAGES_LIMIT } from "../constants";

const MoviesGallery = () => {
  const [movies, setMovies] = useState([]);
  const [filterBy, setFilterBy] = useState("popular");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const favMoviesCtx = useContext(FavMoviesContext);

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      if (filterBy === "favorites") {
        setMovies(favMoviesCtx.favMovies);
        setTotalPages(1);
      } else {
        const { results, total_pages } = await fetchMoviesByCategory(filterBy, {
          page,
        });
        setMovies(results);
        setTotalPages(
          total_pages > API_PAGES_LIMIT ? API_PAGES_LIMIT : total_pages
        );
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const pageChangeHandler = (_event, value) => {
    setPage(value);
  };

  const filterChangeHandler = (event) => {
    setFilterBy(event.target.value);
    setPage(1);
  };

  useEffect(() => {
    fetchMovies();
  }, [filterBy, page]);

  const pagination = totalPages > 1 ? (
    <Pagination
      className="MoviesGallery-Pagination"
      size="large"
      page={page}
      count={totalPages}
      onChange={pageChangeHandler}
    />
  ) : <></>;

  return (
    <Container className="MoviesGallery">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="start"
        width="100%"
      >
        {pagination}
        <div className="MoviesGallery-filter">
          <Select value={filterBy} onChange={filterChangeHandler} autoWidth>
            <MenuItem value={"popular"}>Popular</MenuItem>
            <MenuItem value={"now_playing"}>Now Playing</MenuItem>
            <MenuItem value={"favorites"}>Favorites</MenuItem>
          </Select>
        </div>
      </Stack>
      {isLoading ? (
        <CircularProgress />
      ) : movies.length ? (
        <ImageList
          className="MoviesGallery-Gallery"
          sx={{
            transform: "translateZ(0)",
          }}
          cols={12}
          rowHeight={200}
          gap={20}
        >
          {movies.map((movie) => (
            <ErrorBoundary key={movie.id}>
              <MoviesGalleryItem movie={movie} />
            </ErrorBoundary>
          ))}
        </ImageList>
      ) : (
        <></>
      )}
      {pagination}
    </Container>
  );
};

export default MoviesGallery;
