import http from "@/services/http-service";
import { API_URL, API_KEY, LS_SESSION, LS_ACCOUNT } from "@/constants";

const ls = window.localStorage;

export const getAccountID = async () => {
  const session_id = ls.getItem(LS_SESSION);
  try {
    const res = await http.get(
      `${API_URL}/account?api_key=${API_KEY}&session_id=${session_id}`
    );
    if (res.data) {
      return res.data.id;
    }
    throw new Error("Failed to fetch account");
  } catch (err) {
    console.log(err);
  }
};

export const fetchFavoriteMovies = async (params = {}) => {
  const account_id = ls.getItem(LS_ACCOUNT);
  const session_id = ls.getItem(LS_SESSION);
  if (!account_id) {
    throw new Error("Cannot fetch favorite movies. Account ID is required.");
  }

  const res = await http.get(
    `${API_URL}/account/${account_id}/favorite/movies`,
    { params: { ...params, session_id } }
  );
  if (res.data?.results) {
    return {
      results: res.data.results,
      page: res.data.page,
      total_pages: res.data.total_pages,
    };
  }
  throw new Error("Failed to fetch favorite movies");
};

export const fetchAllFavoriteMovies = async () => {
  const movies = [];
  let page = 1;

  while (true) {
    try {
      const {
        page: currentPage,
        total_pages,
        results,
      } = await fetchFavoriteMovies({ page });
      movies.push(...results);

      if (currentPage >= total_pages) {
        return { movies, total_pages };
      }

      page++;
    } catch (error) {
      console.error("An error occurred while fetching favorite movies:", error);
      throw error;
    }
  }
};

export const setFavoriteMovie = async (id, isFav) => {
  const account_id = ls.getItem(LS_ACCOUNT);
  const session_id = ls.getItem(LS_SESSION);
  if (!account_id) {
    throw new Error("Cannot fetch favorite movies. Account ID is required.");
  }
  const res = await http.post(
    `${API_URL}/account/${account_id}/favorite`,
    {
      media_type: "movie",
      media_id: id,
      favorite: isFav,
    },
    { params: { session_id } }
  );
  if (res.data?.success) {
    return res.data;
  }
  throw new Error("Failed to set favorite movie");
};
