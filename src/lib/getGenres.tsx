export type Genre = {
  id: number;
  name: string;
};
export const getGenres = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=en",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  // console.log(data);
  return data.genres;
};
