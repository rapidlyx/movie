import { MovieCard } from "@/app/components/MovieCard";
import { DynamicPagination } from "@/app/components/DynamicPagination";

export default async function SimilarPage({
  params,
  searchParams,
}: {
  params: Promise<{ similarId: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.similarId;
  const sParams = await searchParams;

  const currentPage = Number(sParams.page) || 1;

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=${currentPage}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN_KEY}`,
      },
      cache: "no-store",
    },
  );

  const data = await res.json();
  const totalPages = data.total_pages > 500 ? 500 : data.total_pages;
  const movies = data?.results || [];
  return (
    <div className="flex  flex-col items-center max-sm:px-5 sm:px-5">
      <div className="flex flex-col justify-center items-center max-w-360 w-full gap-8">
        <div className="flex w-full pt-13">
          <p className="text-3xl font-semibold ">More like this </p>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movies.map((movie: any) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
        <div>
          <DynamicPagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
