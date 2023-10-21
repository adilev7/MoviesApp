import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  CircularProgress,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { StarBorder, Star, ArrowBack } from "@mui/icons-material";
import FavMoviesContext from "@/store/fav-movies-context";
import { fetchMovieById } from "@/services/movies-service";
import { getApiImageUrl } from "@/utils";
import BaseIconButton from "./UI/BaseIconButton";

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [isFav, setIsFav] = useState(false);
  const [loading, setLoading] = useState(true);
  const favMoviesCtx = useContext(FavMoviesContext);

  const { id } = useParams();

  const fetchMovie = async () => {
    setLoading(true);
    try {
      const movieData = await fetchMovieById(id);
      setMovie(movieData);
      setIsFav(favMoviesCtx.isFavorite(movieData.id));
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const favToggleHandler = () => {
    favMoviesCtx.toggleFavMovie(movie);
    setIsFav((fav) => !fav);
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  const imageBannerStyle = movie && {
    backgroundImage: `url(${getApiImageUrl(movie.backdrop_path)})`,
  };
  const favBtnTitle = isFav ? "Marked as favorite" : "Mark as favorite";
  const favBtnIcon = isFav ? (
    <Star fontSize="large" />
  ) : (
    <StarBorder fontSize="large" />
  );
  const movieGenres = movie && movie.genres.map((genre) => (
    <p key={genre.id}>{genre.name}</p>
  ));

  return loading ? (
    <CircularProgress />
  ) : (
    <div className="MovieDetails">
      <BaseIconButton component={Link} to="/" title="Back" className="MovieDetails-Back hover-grow">
        <ArrowBack fontSize="large" />
      </BaseIconButton>
      <div className="AppBanner" style={imageBannerStyle}></div>
      <Container>
        <div className="MovieDetails-Content">
          <Stack spacing={2} direction="row" alignContent="start">
            <Typography
              variant="h1"
              fontWeight="bold"
              className="MovieDetails-Title"
            >
              {movie.title}
            </Typography>
            <BaseIconButton
              onClick={favToggleHandler}
              aria-label={`star ${movie.title}`}
              title={favBtnTitle}
            >
              {favBtnIcon}
            </BaseIconButton>
          </Stack>
          <Stack spacing={2} direction="row" className="MovieDetails-Genres">
            {movieGenres}
          </Stack>
          <p className="MovieDetails-Description">{movie.overview}</p>
        </div>
      </Container>
    </div>
  );
};

export default MovieDetails;
