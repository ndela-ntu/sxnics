"use client";

import { IMergedEpisode } from "@/models/MergedEpisode";
import ShareButton from "./ShareButton";
import Link from "next/link";
import Image from "next/image";
import { useAudioContext } from "@/context/AudioContext";
import { Pause, Play } from "lucide-react";
import { useEffect } from "react";

export default function CardPlayer({
  episode,
  isActive,
}: {
  episode: IMergedEpisode;
  isActive: boolean;
}) {
  const {
    isRadioPlaying,
    setIsRadioPlaying,
    activeEpisode,
    setActiveEpisode,
    isEpisodePlaying,
    setIsEpisodePlaying,
  } = useAudioContext();

  useEffect(() => {
    if (isRadioPlaying && activeEpisode) {
      setActiveEpisode((prev) => ({ ...prev!, isPlaying: false }));
    }
  }, [isRadioPlaying]);

  return (
    <div className="flex flex-col w-full max-h-fit border">
      <div className="p-2.5 flex items-center justify-between bg-white text-black w-full">
        <div className="flex flex-col ">
          <span className="text-xs md:text-base">{episode.name}</span>
          <span className="text-sm md:text-lg">{episode.artists.name}</span>
        </div>
        <ShareButton
          artistName={episode.artists.name}
          mixTitle={episode.name}
          mixUrl={`https://sxnics.com/episodes/${episode.id}?type=${
            episode.type === "audio" ? "audio" : "video"
          }`}
        />
      </div>
      <div className="w-full h-full">
        <div className="aspect-square relative overflow-hidden">
          <Link href={`/episodes/${episode.id}/?type=${episode.type}`}>
            <Image
              src={episode.imageUrl}
              alt="Image of episode"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </Link>
          {episode.type === "audio" &&
            (activeEpisode?.id === episode.id ? (
              <button
                className="bottom-0 right-0 flex items-center justify-center absolute m-auto w-10 h-7 md:w-16 md:h-10 bg-white text-black"
                onClick={() => {
                  if (activeEpisode?.id === episode.id && isEpisodePlaying) {
                    setIsEpisodePlaying(false);
                  } else {
                    setIsEpisodePlaying(true);
                    setIsRadioPlaying(false);
                  }
                }}
              >
                {isEpisodePlaying ? (
                  <Pause className="h-5 w-5 md:h-8 md:w-8" />
                ) : (
                  <Play className="h-5 w-5 md:h-8 md:w-8" />
                )}
              </button>
            ) : (
              <button
                className="bottom-0 right-0 flex items-center justify-center absolute m-auto w-10 h-7 bg-white text-black"
                onClick={() => {
                  setActiveEpisode(episode);
                  setIsEpisodePlaying(true);
                  setIsRadioPlaying(false);
                }}
              >
                <Play className="h-5 w-5" />
                <span className="sr-only">Play audio</span>
              </button>
            ))}
          <span className="flex items-center justify-center text-sm md:text-lg px-1 h-7 absolute bottom-0 left-0 bg-black/50 hover:bg-black/70 text-white">
            {episode.tag}
          </span>
        </div>
      </div>
    </div>
  );
}
