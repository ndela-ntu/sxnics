"use client";

import { IEpisode } from "@/models/Episode";
import React, { useEffect, useState } from "react";
import EpisodeCard from "./EpisodeCard";
import { useAudioContext } from "@/context/AudioContext";
import { IMergedEpisode } from "@/models/MergedEpisode";

export default function EpisodeList({ episodes }: { episodes: IMergedEpisode[] }) {
  const { isRadioPlaying, setIsRadioPlaying, activeEpisode, setActiveEpisode, isEpisodePlaying, setIsEpisodePlaying } =
    useAudioContext();

  useEffect(() => {
    if (isRadioPlaying) {
      setIsEpisodePlaying(false);
      //setActiveEpisode((prev) => ({ ...prev!, isPlaying: false }));
    }
  }, [isRadioPlaying]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col pb-10">
        {episodes.map((episode) => {
          if (activeEpisode?.id === episode.id) {
            return (
              <EpisodeCard
                key={episode.id}
                episode={episode}
                isActive={true}
                isPlaying={activeEpisode && isEpisodePlaying!}
                onImageClick={(_) => {
                  if (isEpisodePlaying) {
                    setIsEpisodePlaying(false);
                  }else {
                    setIsEpisodePlaying(true);
                    setIsRadioPlaying(false);
                  }
                  // if (activeEpisode.isPlaying) {
                  //   setActiveEpisode((prev) => ({
                  //     ...value,
                  //     isPlaying: false,
                  //   }));
                  // } else {
                  //   setActiveEpisode((prev) => ({
                  //     ...value,
                  //     isPlaying: true,
                  //   }));
                  //   setIsRadioPlaying(false);
                  // }
                }}
              />
            );
          }

          return (
            <EpisodeCard
              key={episode.id}
              isActive={false}
              episode={episode}
              isPlaying={false}
              onImageClick={(value) => {
                setActiveEpisode(value);
                setIsEpisodePlaying(true);
                // setActiveEpisode((prev) => ({
                //   ...value,
                //   isPlaying: true,
                // }));
                setIsRadioPlaying(false);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
