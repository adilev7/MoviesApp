import React, { useContext, useEffect, useState } from "react";
import { ImageListItem, ImageListItemBar } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import FavMoviesContext from "@/store/fav-movies-context";
import { getApiImageUrl } from "@/utils";
import BaseIconButton from '@/components/UI/BaseIconButton'
import { Link } from "react-router-dom";

const MoviesGalleryItem = ({ movie }) => {

  const [isFav, setIsFav] = useState(false);
  const favMoviesCtx = useContext(FavMoviesContext);

  const favToggleHandler = (e) => {
    e.preventDefault();
    favMoviesCtx.toggleFavMovie(movie);
    setIsFav(fav => !fav);
  };

  useEffect(() => {
    const isFavorite = favMoviesCtx.isFavorite(movie.id);
    setIsFav(isFavorite);
  }, []);


  return (
    <ImageListItem component={Link} to={`/${movie.id}`} cols={3} rows={2} className="hover-grow-slow">
      <img
        src={getApiImageUrl(movie.poster_path)}
        alt={movie.title}
        loading="lazy"
      />
      <ImageListItemBar
        sx={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
            "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
        }}
        title={movie.title}
        position="top"
        actionIcon={
          <BaseIconButton
            onClick={favToggleHandler}
            aria-label={`star ${movie.title}`}
          >
            {isFav ? <StarIcon /> : <StarBorderIcon />}
          </BaseIconButton>
        }
        actionPosition="left"
      />
    </ImageListItem>
  );
};

export default MoviesGalleryItem;
