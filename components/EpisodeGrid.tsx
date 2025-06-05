"use client";

import { useAudioContext } from "@/context/AudioContext";
import { IMergedEpisode } from "@/models/MergedEpisode";
import { Pause, Play, Share, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import EpisodeCarousel from "./EpisodeCarousel";
import ShareButton from "./episodes/ShareButton";
import ViewEpisodePlayer from "./episodes/ViewEpisodePlayer";
import CardPlayer from "./episodes/CardPlayer";

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

  return (
    <div className="flex flex-col space-y-2.5 md:flex-row md:space-x-5 justify-center w-full h-full">
      <div className="md:w-1/2 w-full max-h-fit">
        {activeEpisode ? (
          <CardPlayer isActive={true} episode={activeEpisode} />
        ) : (
          <div className="flex items-center justify-center">
            No episode in site
          </div>
        )}
        <div className="md:hidden border py-2.5">
          <EpisodeCarousel episodes={episodes} />
        </div>
      </div>
      <div className="hidden md:grid md:grid-cols-2 md:w-1/2 gap-2.5">
        {episodes.map((episode, index) => (
          <div
            key={episode.id}
            className={`${index > 3 ? "hidden" : ""}`}
          >
            <CardPlayer isActive={false} episode={episode} />
          </div>
        ))}
      </div>
    </div>
  );
}
