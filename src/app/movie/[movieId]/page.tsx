import { TbStarFilled } from "react-icons/tb";
import Team from "@/app/components/Directors";
import Link from "next/link";
import { SimilarMovie } from "@/app/components/SimilarMovie";
import { WatchTrailerButtonDetail } from "@/app/components/TrailerButtonDetail";

type Params = {
  params: Promise<{
    movieId: string;
  }>;
};

type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  runtime: number;
  vote_count: number;
  genres: { id: number; name: string }[];
};

export default async function MovieDetails({ params }: Params) {
  const resolvedParams = await params;
  const movieId = resolvedParams.movieId;

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN_KEY}`,
      },
    },
  );

  const data: Movie = await res.json();

  return (
    <div className="max-w-7xl mx-auto px-4 max-sm:px-0 py-6 space-y-6 flex flex-col justify-center ">
      <div className="flex flex-col sm:flex-row justify-between w-full gap-4 max-sm:px-5 max-sm:flex-row">
        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl font-semibold">{data.title}</h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            {data.release_date} • PG • {Math.floor(data.runtime / 60)}h{" "}
            {data.runtime % 60}m
          </p>
        </div>

        <div className="flex items-center gap-2 sm:flex-col sm:items-end sm:pr-3">
          <p className="text-sm font-medium uppercase tracking-wider text-gray-400 hidden sm:block">
            Rating
          </p>
          <div className="flex items-center gap-1">
            <TbStarFilled className="text-yellow-400 w-6 h-6 sm:w-7 sm:h-7" />
            <div className="flex flex-col">
              <p className="text-lg font-semibold leading-tight">
                {data.vote_average.toFixed(1)}
                <span className="text-sm text-gray-500 font-normal">/10</span>
              </p>

              <p className="text-xs text-gray-400">
                {new Intl.NumberFormat("en", {
                  notation: "compact",
                  maximumFractionDigits: 1,
                }).format(data.vote_count)}{" "}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-8 items-start lg:items-center">
        <div className="relative w-full lg:order-2">
          <img
            src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
            className="rounded-md w-full h-52.75 sm:h-100 lg:h-112.5 object-cover max-sm:rounded-none"
            alt="backdrop"
          />

          <div className="absolute left-4 bottom-4 flex items-center gap-3">
            <WatchTrailerButtonDetail movieId={movieId} />

            <span className="text-white text-sm font-semibold drop-shadow-md">
              Play trailer
            </span>
          </div>
        </div>

        <div className="hidden sm:block shrink-0 lg:order-1 ">
          <img
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            className="rounded-lg w-48 lg:w-72 shadow-xl "
            alt="poster"
          />
        </div>
      </div>

      <div className="flex flex-col max-sm:flex-row md:flex-row gap-6 max-sm:px-5 ">
        <div className="sm:hidden w-32 shrink-0">
          <img
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            className="rounded shadow-md max-sm:rounded-none"
            alt="poster-mobile"
          />
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex gap-2 flex-wrap">
            {data.genres?.map((g) => (
              <Link key={g.id} href={`/genres/${g.id}`}>
                <span className="px-3 py-1 rounded-full border border-gray-300 text-xs sm:text-sm text-black cursor-pointer hover:bg-black hover:text-white hover:border-none transition duration-200">
                  {g.name}
                </span>
              </Link>
            ))}
          </div>

          <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
            {data.overview}
          </p>
        </div>
      </div>

      <div className="pt-4 space-y-8 max-sm:px-5">
        <Team id={movieId} />
        <div className=" pt-6 ">
          <SimilarMovie id={movieId} />
        </div>
      </div>
    </div>
  );
}
