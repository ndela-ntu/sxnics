"use client";

import { useAudioContext } from "@/context/AudioContext";
import { IEpisode } from "@/models/Episode";
import { IMergedEpisode } from "@/models/MergedEpisode";
import { IVideoEpisode } from "@/models/VideoEpisode";
import { Pause, Play } from "lucide-react";
import Image from "next/image";
import { YouTubeEmbed } from "./YoutubeEmbed";

export default function ViewEpisodePlayer({
  episode,
}: {
  episode: IMergedEpisode;
}) {
  const {
    activeEpisode,
    setActiveEpisode,
    setIsRadioPlaying,
    isEpisodePlaying,
    setIsEpisodePlaying,
  } = useAudioContext();

  return (
    <div className="h-full w-full flex items-center justify-center">
      {episode.type === "audio" ? (
        <div className="relative aspect-square w-full md:w-[50%] lg:w-[75%]">
          <div className="h-full w-full">
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
                if (activeEpisode === null) {
                  setActiveEpisode(episode);
                  setIsEpisodePlaying(true);
                }

                if (activeEpisode?.id === episode.id) {
                  //current episode
                  if (isEpisodePlaying) {
                    setIsEpisodePlaying(false);
                  } else {
                    setIsEpisodePlaying(true);
                    setIsRadioPlaying(false);
                  }
                } else {
                  //not current episode
                  setActiveEpisode(episode);
                  setIsEpisodePlaying(true);
                  setIsRadioPlaying(false);
                }
              }}
            >
              {activeEpisode &&
              activeEpisode?.id === episode.id &&
              isEpisodePlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
              <span className="sr-only">
                {activeEpisode &&
                activeEpisode?.id === episode.id &&
                isEpisodePlaying
                  ? "Pause"
                  : "Play"}
                audio
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full h-full">
          <YouTubeEmbed videoUrl={episode.mediaUrl} />
        </div>
      )}
    </div>
  );
}
