import { MovieCard } from "@/app/components/MovieCard";
import { getGenres } from "@/lib/getGenres";
import { ChevronRightIcon } from "lucide-react";
import { DynamicPagination } from "@/app/components/DynamicPagination";

import Link from "next/link";

export default async function ResultPage({
  params,
  searchParams,
}: {
  params: Promise<{ searchValue: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedParams = await params;
  const searchValue = resolvedParams.searchValue;
  const sParams = await searchParams;

  const currentPage = Number(sParams.page) || 1;

  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en-US&page=${currentPage}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN_KEY}`,
      },
      cache: "no-store",
    },
  );
  const genres = await getGenres();
  const data = await res.json();
  //   console.log(data);
  const movies = data?.results || [];
  const totalPages = data.total_pages > 500 ? 500 : data.total_pages;
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6 max-sm:mb-8">Search results</h1>

      <div className="grid grid-cols-[1fr_auto_300px] gap-8 max-sm:grid-cols-none max-sm:flex max-sm:flex-col">
        <div>
          {movies.length === 0 ? (
            <div className="border rounded-lg py-20 text-center text-gray-500">
              No results found.
            </div>
          ) : (
            <>
              <p className="text-black mb-4 text-xl font-semibold">
                {data.total_results} results for "{searchValue}"
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3   lg:grid-cols-4 gap-6">
                {movies.map((movie: any) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="w-px bg-gray-200"></div>

        <div className="flex flex-col">
          <h3 className="font-semibold mb-3 text-2xl">Search by genre</h3>
          <p className="text-sm text-gray-500 mb-4">
            See lists of movies by genre
          </p>
          <div className="flex flex-wrap gap-2">
            {genres.map((g: any) => (
              <Link
                key={g.id}
                href={`/genres/${g.id}`}
                className="px-3 py-1 border rounded-full  flex items-center border-[#E4E4E7] text-xs hover:bg-black hover:text-white hover:border-black"
              >
                {g.name}
                <ChevronRightIcon style={{ width: "12px", height: "12px" }} />
              </Link>
            ))}
          </div>
        </div>
        <div>
          <DynamicPagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
