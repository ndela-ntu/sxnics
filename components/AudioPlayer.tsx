"use client";

import React, { useState, useRef, useEffect } from "react";
import { Pause, Play, X } from "lucide-react";
import { IEpisode } from "@/models/Episode";

interface AudioPlayerProps {
  episode: IEpisode;
  isPlaying: boolean;
  onXClick: () => void;
  onTogglePlay: (playing: boolean) => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  episode,
  isPlaying,
  onXClick,
  onTogglePlay,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [error, setError] = useState<string>("");

  // Handle iOS-specific audio playback challenges
  useEffect(() => {
    const audioElement = audioRef.current;

    const handleInterruption = () => {
      onTogglePlay(false);
    };

    if (audioElement) {
      audioElement.addEventListener("pause", handleInterruption);
      audioElement.addEventListener("ended", handleInterruption);

      // iOS requires a user gesture to start playing
      const playPromise = isPlaying
        ? audioElement.play()
        : audioElement.pause();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          setError(`Playback prevent:${error}`);
          // Auto-play was prevented, likely due to iOS restrictions
          console.log("Playback prevented:", error);
          onTogglePlay(false);
        });
      }

      return () => {
        audioElement.removeEventListener("pause", handleInterruption);
        audioElement.removeEventListener("ended", handleInterruption);
      };
    }
  }, [isPlaying, onTogglePlay]);

  // Update progress and current time
  const updateProgress = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      const progressPercent =
        (audioElement.currentTime / audioElement.duration) * 100;
      setProgress(progressPercent);
      setCurrentTime(audioElement.currentTime);
    }
  };

  // Format time to MM:SS
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Handle progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.nativeEvent.offsetX;
    const progressBarWidth = progressBar.clientWidth;
    const clickPercentage = (clickPosition / progressBarWidth) * 100;

    if (audioRef.current) {
      const newTime = (clickPercentage / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(clickPercentage);
    }
  };

  if (error) {
    return (
      <div className="bg-gray-900 text-white p-4 flex items-center space-x-4 w-full">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white p-4 flex items-center space-x-4 w-full">
      {/* Artist Image */}
      <div className="w-16 h-16 flex-shrink-0">
        <img
          src={episode.artists.imageUrl || episode.imageUrl}
          alt={episode.name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={episode.audioUrl}
        onTimeUpdate={updateProgress}
        onLoadedMetadata={(e) => {
          const target = e.target as HTMLAudioElement;
          setDuration(target.duration);
        }}
      />

      <div className="flex-grow flex flex-col">
        {/* Episode and Artist Info */}
        <div className="truncate">
          <p className="font-semibold text-sm">{episode.name}</p>
          <p className="text-xs text-gray-400">{episode.artists.name}</p>
        </div>

        {/* Controls Container */}
        <div className="flex items-center space-x-4 mt-2">
          {/* Close Button */}
          <button
            onClick={onXClick}
            className="hover:bg-gray-700 p-1 rounded-full"
          >
            <X size={20} />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={() => onTogglePlay(!isPlaying)}
            className="bg-blue-500 hover:bg-blue-600 p-1 rounded-full"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>

          {/* Progress Bar */}
          <div className="flex-grow flex items-center space-x-2">
            <span className="text-xs">{formatTime(currentTime)}</span>
            <div
              className="flex-grow bg-gray-700 h-1 rounded-full cursor-pointer"
              onClick={handleProgressClick}
            >
              <div
                className="bg-blue-500 h-1 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs">{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
