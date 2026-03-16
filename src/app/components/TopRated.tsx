import { Movie } from "../page";
import { MovieCard } from "./MovieCard";
import Link from "next/link";
import * as motion from "motion/react-client";
import { ArrowRightIcon } from "lucide-react";
export const fetchfromTopRatedMovieDB = async (
  category: string,
  page: number = 1,
) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN_KEY}`,
      },
    },
  );
  const data = await response.json();
  return data?.results;
};
export const TopRated = async () => {
  const TopRated: Movie[] = await fetchfromTopRatedMovieDB("top_rated");
  return (
    <div className="w-full flex flex-col gap-8 mt-8 max-sm:px-5">
      <div className="text-2xl font-semibold  flex gap-8 justify-between">
        <h1>Top Rated</h1>
        <Link href="/category/top_rated">
          <button className="flex text-sm  justify-center items-center gap-2 cursor-pointer">
            See more
            <ArrowRightIcon style={{ width: "16px", height: "16px" }} />
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {TopRated?.slice(0, 10).map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
};
