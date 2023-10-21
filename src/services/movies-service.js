import http from "@/services/http-service";
import { API_URL } from "@/constants";

export const fetchMoviesByCategory = async (category, params) => {
  const res = await http.get(`${API_URL}/movie/${category}`, { params });
  if (res.data?.results) {
    return res.data.results;
  }
  throw new Error("Failed to fetch movies");
};

export const fetchMovieById = async (id, params) => {
  const res = await http.get(`${API_URL}/movie/${id}`, { params });
  if (res.data) {
    return res.data;
  }
  throw new Error("Failed to fetch movie");
};
