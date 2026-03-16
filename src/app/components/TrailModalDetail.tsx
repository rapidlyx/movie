"use client";

type Props = {
  youtubeKey: string;
  onClose: () => void;
  movieId: string;
};

export const TrailerModalDetail = ({ youtubeKey, onClose }: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-0">
      {/* Wrapper */}
      <div className="relative w-full max-w-4xl">
        {/* ❌ Close button – iframe-ийн ГАДНА */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-3xl hover:scale-110 transition"
        >
          ✕
        </button>

        {/* Video container */}
        <div className="w-full aspect-video bg-black overflow-hidden">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeKey}?autoplay=1`}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};
