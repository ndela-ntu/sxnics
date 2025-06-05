"use client";

import { useAudioContext } from "@/context/AudioContext";
import { IMergedEpisode } from "@/models/MergedEpisode";
import { Pause, Play, Share, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import EpisodeCarousel from "./EpisodeCarousel";
import ShareButton from "./episodes/ShareButton";

export default function EpisodeGrid({
  episodes,
}: {
  episodes: IMergedEpisode[];
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
    setActiveEpisode(episodes.length > 0 ? episodes[0] : null);
  }, []);

  useEffect(() => {
    if (isRadioPlaying && activeEpisode) {
      setActiveEpisode((prev) => ({ ...prev!, isPlaying: false }));
    }
  }, [isRadioPlaying]);

  return (
    <div className="flex flex-col space-y-2.5 md:flex-row md:space-x-5 items-center justify-center w-full h-full">
      <div className="md:w-1/2 w-full">
        {activeEpisode ? (
          <div className="flex flex-col w-full h-full border">
            <div className="p-2.5 flex items-center justify-between bg-white text-black w-full">
              <div className="flex flex-col ">
                <span className="text-xs md:text-base">{activeEpisode.name}</span>
                <span className="text-sm md:text-lg">{activeEpisode.artists.name}</span>
              </div>
              <ShareButton
                artistName={activeEpisode.artists.name}
                mixTitle={activeEpisode.name}
                mixUrl={`https://sxnics.com/episodes/${activeEpisode.id}?type=${
                    activeEpisode.type === "audio" ? "audio" : "video"
                }`}
              />
            </div>
            <div className="w-full h-full">
              <div className="aspect-square relative overflow-hidden">
                <Link
                  href={`/episodes/${activeEpisode.id}/?type=${activeEpisode.type}`}
                >
                  <Image
                    src={activeEpisode.imageUrl}
                    alt="Image of episode"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </Link>
                {activeEpisode.type === "audio" && (
                  <button
                    className="bottom-0 right-0 flex items-center justify-center absolute m-auto w-10 h-7 bg-white text-black"
                    onClick={() => {
                      if (isEpisodePlaying) {
                        setIsEpisodePlaying(false);
                      } else {
                        setIsEpisodePlaying(true);
                        setIsRadioPlaying(false);
                      }
                    }}
                  >
                    {isEpisodePlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </button>
                )}
                <span className="flex items-center justify-center text-sm px-1 h-7 absolute bottom-0 left-0 bg-black/50 hover:bg-black/70 text-white">
                  {activeEpisode.tag}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            No episode in site
          </div>
        )}
        <div className="hidden md:grid md:grid-cols-3 md:w-1/2 gap-5">
          {episodes.map((episode) => (
            <div
              key={episode.id}
              className="aspect-square relative overflow-hidden border"
            >
              <Link href={`/episodes/${episode.id}/?type=${episode.type}`}>
                <Image
                  src={episode.imageUrl}
                  alt="Image of episode"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </Link>
            </div>
          ))}
        </div>
        <div className="md:hidden border py-2.5">
          <EpisodeCarousel
            episodes={episodes}
          />
        </div>
      </div>
    </div>
  );
}
