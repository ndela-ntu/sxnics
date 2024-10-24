"use client";

import { IEpisode } from "@/models/Episode";
import React, { useEffect, useState } from "react";
import EpisodeCard from "./EpisodeCard";
import AudioPlayer from "../AudioPlayer";
import { useAudioContext } from "@/context/AudioContext";

export default function EpisodeList({ episodes }: { episodes: IEpisode[] }) {
  const [activeEpisode, setActiveEpisode] = useState<
    (IEpisode & { isPlaying: boolean }) | null
  >(null);

  const { isRadioPlaying, updateIsPlaying } = useAudioContext();

  useEffect(() => {
    if (isRadioPlaying) {
      setActiveEpisode((prev) => ({ ...prev!, isPlaying: false }));
    }
  }, [isRadioPlaying])

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
                isPlaying={activeEpisode.isPlaying}
                onImageClick={(value) => {
                  if (activeEpisode.isPlaying) {
                    setActiveEpisode((prev) => ({
                      ...value,
                      isPlaying: false,
                    }));
                  } else {
                    setActiveEpisode((prev) => ({
                      ...value,
                      isPlaying: true,
                    }));
                    updateIsPlaying(false);
                  }
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
                setActiveEpisode((prev) => ({
                  ...value,
                  isPlaying: true,
                }));
                updateIsPlaying(false);
              }}
            />
          );
        })}
      </div>
      {activeEpisode && (
        <div>
          <AudioPlayer
            episode={activeEpisode}
            isPlaying={activeEpisode.isPlaying}
            onXClick={() => setActiveEpisode(null)}
            onTogglePlay={(value) => {
              console.log(value);
              setActiveEpisode((_) => ({
                ...activeEpisode,
                isPlaying: value,
              }));
            }}
          />
        </div>
      )}
    </div>
  );
}
