"use client";

import { useAudioContext } from "@/context/AudioContext";
import { IEpisode } from "@/models/Episode";
import { Pause, Play } from "lucide-react";
import Image from "next/image";

export default function ViewEpisodePlayer({ episode }: { episode: IEpisode }) {
  const { activeEpisode, setActiveEpisode, updateIsPlaying } =
    useAudioContext();

  return (
    <div className="relative aspect-square md:h-1/2 md:w-1/2 lg:h-1/3 lg:w-1/3">
      <Image
        src={episode.imageUrl}
        alt="Image of episode"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
      />
      <button
        className="flex items-center justify-center absolute inset-0 m-auto w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white"
        onClick={() => {
          if (activeEpisode?.isPlaying) {
            setActiveEpisode((_) => ({
              ...episode,
              isPlaying: false,
            }));
          } else {
            setActiveEpisode((_) => ({
              ...episode,
              isPlaying: true,
            }));
            updateIsPlaying(false);
          }
        }}
      >
        {activeEpisode?.isPlaying ? (
          <Pause className="h-6 w-6" />
        ) : (
          <Play className="h-6 w-6" />
        )}
        <span className="sr-only">
          {activeEpisode?.isPlaying ? "Pause" : "Play"} audio
        </span>
      </button>
    </div>
  );
}
