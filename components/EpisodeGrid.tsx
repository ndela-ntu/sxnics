"use client";

import { useAudioContext } from "@/context/AudioContext";
import { IMergedEpisode } from "@/models/MergedEpisode";
import { Pause, Play, Share, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import EpisodeCarousel from "./EpisodeCarousel";

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
    if (isRadioPlaying && activeEpisode) {
      setActiveEpisode((prev) => ({ ...prev!, isPlaying: false }));
    }
  }, [isRadioPlaying]);

  return (
    <div className="flex flex-col space-y-2.5 md:flex-row md:space-x-5 items-center justify-center w-full h-full">
      <div className="md:w-1/2 w-full">
        <HighlightedEpisode
          episode={activeEpisode || episodes[episodes.length - 1]}
        />
      </div>
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
      <div className="md:hidden">
        <EpisodeCarousel
          episodes={episodes.filter(
            (episode) =>
              episode.id !== activeEpisode?.id ||
              episode.id !== episodes[episodes.length - 1].id
          )}
        />
      </div>
    </div>
  );
}

const HighlightedEpisode = ({
  episode,
}: {
  episode: IMergedEpisode | undefined;
}) => {
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
    <>
      {!episode ? (
        <div className="flex items-center justify-center">
          No episode identified
        </div>
      ) : (
        <div className="flex flex-col w-full h-full border">
          <div className="flex items-center bg-white text-black w-full">
            <div className="flex flex-col">
              <span>{episode.name}</span>
              <span>{episode.artists.name}</span>
            </div>
            <span>
              <Share2 className="h-5 w-5" />
            </span>
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
                    className="bottom-0 right-0 flex items-center justify-center absolute m-auto w-10 h-7 bg-white text-black"
                    onClick={() => {
                      if (
                        activeEpisode?.id === episode.id &&
                        isEpisodePlaying
                      ) {
                        setIsEpisodePlaying(false);
                      } else {
                        setIsEpisodePlaying(true);
                        setIsRadioPlaying(false);
                      }
                    }}
                  >
                    {activeEpisode.id === episode.id && isEpisodePlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                    <span className="sr-only">
                      {activeEpisode.id === episode.id && isEpisodePlaying
                        ? "Pause"
                        : "Play"}{" "}
                      audio
                    </span>
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

              <span className="flex items-center justify-center text-sm px-1 h-7 absolute bottom-0 left-0 bg-black/50 hover:bg-black/70 text-white">
                {episode.tag}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
