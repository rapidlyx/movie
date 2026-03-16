import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { ChevronRightIcon } from "lucide-react";
import { MovieCard } from "@/app/components/MovieCard";
import { getGenres } from "@/lib/getGenres";
import { DynamicPagination } from "@/app/components/DynamicPagination";

export default async function GenresPage({
  params,
  searchParams,
}: {
  params: Promise<{ genreIds: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { genreIds } = await params;
  const sParams = await searchParams;

  const currentPage = Number(sParams.page) || 1;

  const decodedIds = genreIds === "all" ? "" : decodeURIComponent(genreIds);

  const selectedIds =
    decodedIds === ""
      ? []
      : decodedIds
          .split(",")
          .map((id) => id.trim())
          .filter(Boolean);

  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${decodedIds}&page=${currentPage}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN_KEY}`,
      },
      cache: "no-store",
    },
  );

  const data = await res.json();
  const movies = data?.results || [];
  const totalPages = data.total_pages > 500 ? 500 : data.total_pages;

  const genres = await getGenres();
  const selectedGenreNames = genres
    .filter((g: any) => selectedIds.includes(String(g.id)))
    .map((g: any) => g.name);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6 text-black">Search filter</h1>

      <div className="grid grid-cols-12 gap-8">
        {/* LEFT-GENRES */}
        <div className="col-span-12 md:col-span-3">
          <h3 className="font-semibold text-2xl mb-1 text-black">Genres</h3>
          <p className="text-gray-500 text-sm mb-4">
            See lists of movies by genre
          </p>

          <div className="flex flex-wrap gap-2">
            {genres.map((g: any) => {
              const id = String(g.id);
              const isSelected = selectedIds.includes(id);

              // NEW GENREIDS
              let newIds: string;
              if (isSelected) {
                newIds = selectedIds.filter((x) => x !== id).join(",");
              } else {
                newIds =
                  selectedIds.length > 0 ? [...selectedIds, id].join(",") : id;
              }

              const href = newIds ? `/genres/${newIds}` : "/genres/all";

              return (
                <Link
                  key={id}
                  href={href}
                  className={`px-3 py-1 rounded-full border text-xs flex items-center gap-1 transition-all duration-200
                    ${
                      isSelected
                        ? "bg-black text-white border-black"
                        : "bg-white border-gray-300 text-black hover:border-gray-400"
                    }`}
                >
                  {g.name}
                  {isSelected ? (
                    <IoClose size={14} />
                  ) : (
                    <ChevronRightIcon size={12} />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* RIGHT – MOVIES */}
        <div className="col-span-12 md:col-span-9">
          {/* <div className="border-t"></div> */}
          <p className="text-black font-semibold mb-6 text-xl">
            {data.total_results?.toLocaleString()} titles in
            <span className="font-bold">
              {" "}
              "{selectedGenreNames.join(", ")}"
            </span>
          </p>

          {movies.length === 0 ? (
            <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-xl">
              <p className="text-gray-400">No content found</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movies.map((movie: any) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="px-0 py-10">
        <DynamicPagination totalPages={totalPages} />
      </div>
    </div>
  );
}
