"use client";

import { useState } from "react";
import { TrailerModalDetail } from "./TrailModalDetail";
import { BsCaretRight } from "react-icons/bs";

type Props = {
  movieId: string;
};

export const WatchTrailerButtonDetail = ({ movieId }: Props) => {
  const [youtubeKey, setYoutubeKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setYoutubeKey(null);
    setLoading(true);

    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN_KEY}`,
        },
      },
    );

    const data = await res.json();

    const trailer =
      data.results?.find(
        (v: any) => v.site === "YouTube" && v.type === "Trailer",
      ) || data.results?.find((v: any) => v.site === "YouTube");

    setYoutubeKey(trailer.key);
    setLoading(false);
  };

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className="py-1 px-2 w-10 h-10 flex gap-2 bg-white text-black text-sm justify-center items-center rounded-full cursor-pointer "
      >
        <BsCaretRight />
      </button>

      {youtubeKey && (
        <TrailerModalDetail
          youtubeKey={youtubeKey}
          onClose={() => setYoutubeKey(null)}
    movieId={movieId}
        />
      )}
    </div>
  );
};
