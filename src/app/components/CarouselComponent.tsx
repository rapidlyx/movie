"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { nowPalying } from "../page";
import { Moviecard1 } from "./MovieCard";
import { WatchTrailerButton } from "./TrailerButton";
import { useState } from "react";

type CarouselComponentProps = {
  nowPlayingMovie: nowPalying[];
};

export const CarouselComponent = ({
  nowPlayingMovie,
}: CarouselComponentProps) => {
  const [movieId, setMovieId] = useState(0);

  const handleMovieSelect = (id: number) => () => {
    setMovieId(id);
  };
  console.log({ movieId });
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {nowPlayingMovie?.map((mov) => (
          <CarouselItem key={mov.id} className="relative">
            <Moviecard1
              mov={mov}
              key={mov.id}
              handleMovieSelect={handleMovieSelect}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <WatchTrailerButton movieId={movieId} />

      <CarouselPrevious className="left-5" />
      <CarouselNext className="right-5" />
    </Carousel>
  );
};
