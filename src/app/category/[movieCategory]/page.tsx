import { fetchfromPopularMovieDB } from "@/app/components/Popular";
import { MovieCard } from "@/app/components/MovieCard";
import { DynamicPagination } from "@/app/components/DynamicPagination";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ movieCategory: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { movieCategory } = await params;
  const sParams = await searchParams;

  const currentPage = Number(sParams.page) || 1;

  const data = await fetchfromPopularMovieDB(movieCategory, currentPage);

  const movies = data || [];
  const totalPages = data.total_pages > 500 ? 500 : data.total_pages;

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="flex flex-col justify-center items-center max-w-7xl w-full gap-8 px-6 pt-10">
        <div className="flex w-full">
          <p className="text-3xl font-semibold capitalize">
            {movieCategory.replace("_", " ")} Movies
          </p>
        </div>

        {movies.length > 0 ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full">
            {movies.map((movie: any) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-gray-500">
            No movies found in this page.
          </div>
        )}

        <div className="py-10">
          <DynamicPagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
