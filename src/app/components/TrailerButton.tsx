"use client";

import { useState, useEffect } from "react";
import { TrailerModal } from "./TrailModal";
import { BsCaretRight } from "react-icons/bs";

type Props = {
  movieId: number;
};

export const WatchTrailerButton = ({ movieId }: Props) => {
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
    console.log(data);
    const trailer =
      data.results?.find(
        (v: any) => v.site === "YouTube" && v.type === "Trailer",
      ) || data.results?.find((v: any) => v.site === "YouTube");

    setYoutubeKey(trailer?.key);
    setLoading(false);
  };

  useEffect(() => {
    handleClick();
  }, [movieId]);

  return (
    <div>
      {youtubeKey && (
        <TrailerModal
          youtubeKey={youtubeKey}
          onClose={() => setYoutubeKey(null)}
          movieId={movieId}
        />
      )}
    </div>
  );
};
