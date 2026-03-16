import Link from "next/link";
import { Movie } from "../page";
import { MovieCard } from "./MovieCard";
import * as motion from "motion/react-client";
import { ArrowRightIcon } from "lucide-react";
export const fetchfromSimilarMovieDB = async (id: string): Promise<Movie[]> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN_KEY}`,
      },
    },
  );
  const data = await response.json();
  console.log(data);
  return data.results;
};
export const SimilarMovie = async ({ id }: { id: string }) => {
  const movies: Movie[] = await fetchfromSimilarMovieDB(id);
  return (
    <div className="flex flex-col gap-8  max-sm:px-0 ">
      <div className="flex justify-between">
        <h2 className="font-semibold text-3xl">More like this</h2>
        <Link
          href={`/similar/${id}`}
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <button className="flex text-sm  justify-center items-center gap-2 cursor-pointer">
            See more
            <ArrowRightIcon style={{ width: "16px", height: "16px" }} />
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-sm:hidden">
        {movies.slice(0, 5).map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6 lg:hidden">
        {movies.slice(0, 6).map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
};
