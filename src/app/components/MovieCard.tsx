import Link from "next/link";
import Image from "next/image";
import { WatchTrailerButton } from "./TrailerButton";
import { BsCaretRight } from "react-icons/bs";
// import { movies } from "../data/movies";
type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
};
type Props = {
  movie: Movie;
};

export const MovieCard = ({ movie }: Props) => {
  return (
    <Link href={`/movie/${movie.id}`}>
      <div
        className="cursor-pointer bg-[#F4F4F5] h-98 rounded-md flex flex-col transition-transform duration-200 max-sm:h-100 
             hover:scale-105 hover:drop-shadow-md"
      >
        <div className="h-75 w-full ">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={200}
            height={300}
            className="h-75 w-full rounded-lg object-cover hover:opacity-40"
          />
        </div>
        <div className="flex flex-col pl-2 ">
          <p className="mt-2 text-sm text-yellow-500">
            ⭐ {movie.vote_average?.toFixed(1)}
            <span className="text-[#71717A] text-xs">/10</span>
          </p>

          <p className="text-lg md:text-base max-sm:text-sm font-medium text-black ">
            {movie.title}
          </p>
        </div>
      </div>
    </Link>
  );
};
type nowPlaying = {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
};
type Props1 = {
  mov: nowPlaying;
  handleMovieSelect: (_id: number) => () => void;
};

export const Moviecard1 = ({ mov, handleMovieSelect }: Props1) => {
  return (
    <div className="w-full h-150  ">
      <div className="grid">
        <Image
          src={`https://image.tmdb.org/t/p/original${mov.backdrop_path}`}
          alt={mov.title}
          width={1000}
          height={600}
          className="w-full h-150 object-cover shrink-0 z-0"
        />
        <div className="flex inset-0 absolute flex-col justify-center px-20 text-white max-w-xl gap-4 z-10">
          <div>
            <p className="text-base font-normal">Now Playing:</p>
            <p className="text-4xl font-bold">{mov.title}</p>
            <p className="text-lg font-semibold">
              ⭐ {mov.vote_average?.toFixed(1)}
              <span className="text-[#71717A] text-base font-normal">/10</span>
            </p>
          </div>
          <p className="text-xs"> {mov.overview} </p>
          <button
            onClick={handleMovieSelect(mov.id)}
            className="py-2 px-4 w-40 flex gap-2 bg-white text-black text-sm justify-center items-center rounded-md cursor-pointer"
          >
            <BsCaretRight />
            "Watch Trailer"
          </button>
        </div>
      </div>
    </div>
  );
};
