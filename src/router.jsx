import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import HomePage from "@/views/HomePage";
import MoviePage from "@/views/MoviePage";
import NotFoundPage from "@/views/NotFoundPage";

export const router = createBrowserRouter([
  {
    
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: ":id", element: <MoviePage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
