"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Loader, Pause, Play, X } from "lucide-react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

export interface IEpisode {
  id: number;
  name: string;
  artistId: number;
  description: string;
  imageUrl: string;
  audioUrl: string;
  tag: string;
  artists: {
    id: number;
    name: string;
    bio: string;
    imageUrl: string;
    socialLinks: any;
  };
}

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
  const [isLoading, setIsLoading] = useState(true);
  const [isErrored, setIsErrored] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState<boolean>(false);

  // Reset loading state when episode changes
  useEffect(() => {
    setIsLoading(true);
    setIsErrored(false);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
  }, [episode.id]);

  // Handle iOS-specific audio playback challenges
  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const setAudioData = () => {
      setDuration(audioElement.duration);
      setCurrentTime(audioElement.currentTime);
      setIsLoading(false);
    };

    const setAudioTime = () => setCurrentTime(audioElement.currentTime);

    const handleInterruption = () => {
      onTogglePlay(false);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
      if (isPlaying) {
        audioElement?.play().catch(() => {
          setIsErrored(true);
          onTogglePlay(false);
        });
      }
    };

    const handleError = () => {
      setIsLoading(false);
      setIsErrored(true);
      onTogglePlay(false);
    };

    if (audioElement) {
      audioElement.addEventListener("loadeddata", setAudioData);
      audioElement.addEventListener("timeupdate", setAudioTime);
      audioElement.addEventListener("pause", handleInterruption);
      audioElement.addEventListener("ended", handleInterruption);
      audioElement.addEventListener("canplay", handleCanPlay);
      audioElement.addEventListener("error", handleError);

      // iOS requires a user gesture to start playing
      if (isPlaying) {
        const playPromise = audioElement.play();

        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("Playback prevented:", error);
            setIsLoading(false);
            setIsErrored(true);
            onTogglePlay(false);
          });
        }
      }

      return () => {
        audioElement.removeEventListener("loadeddata", setAudioData);
        audioElement.removeEventListener("timeupdate", setAudioTime);
        audioElement.removeEventListener("pause", handleInterruption);
        audioElement.removeEventListener("ended", handleInterruption);
        audioElement.removeEventListener("canplay", handleCanPlay);
        audioElement.removeEventListener("error", handleError);
      };
    }
  }, [episode.id, isPlaying, onTogglePlay]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying && !isLoading) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying, isLoading]);

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || isLoading) return;

    try {
      if (audio.paused) {
        await audio.play().catch((error) => {
          console.error("Playback failed:", error);
          onTogglePlay(false);
        });
        onTogglePlay(true);
      } else {
        audio.pause();
        onTogglePlay(false);
      }
    } catch (error) {
      console.error("Toggle play error:", error);
      onTogglePlay(false);
    }
  }, [isPlaying, isLoading]);

  // Format time to MM:SS
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Handle progress bar click
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  if (isErrored) {
    return <div className="text-red-500">Error Loading</div>;
  }

  // // Render play/pause or loading indicator
  // const renderPlaybackControl = () => {
  //   if (isLoading) {
  //     return (
  //       <div className="animate-spin text-blue-500">
  //         <Loader size={24} />
  //       </div>
  //     );
  //   }

  //   if (isErrored) {
  //     return <div className="text-red-500">Error Loading</div>;
  //   }

  //   return (
  //     <button
  //       onClick={() => onTogglePlay(!isPlaying)}
  //       className="bg-blue-500 hover:bg-blue-600 p-1 rounded-full"
  //     >
  //       {isPlaying ? <Pause size={20} /> : <Play size={20} />}
  //     </button>
  //   );
  // };

  return (
    <div className="w-full fixed bottom-0 right-0 z-10 ">
      <div className="relative">
        <div
          className={`${
            isMoreOpen ? "max-h-[700px]" : "max-h-0"
          } overflow-hidden transition-all duration-500 ease-in-out absolute bottom-full left-0 right-0 z-10`}
        >
          <div className="">
            <div className=" aspect-square relative overflow-hidden">
              <Image
                src={episode.imageUrl}
                alt="Image of episode"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
              <div className="w-full selection:flex items-end justify-start absolute bg-black/50 hover:bg-black/70 text-white p-1 text-lg">
                <div className="underline font-bold py-1">{episode.name}</div>
                <div className="whitespace-pre-wrap text-xs max-h-max overflow-y-auto">
                  {episode.description}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex items-end justify-end h-[5%] z-20 w-full">
          <button
            onClick={() => setIsMoreOpen(!isMoreOpen)}
            className="bg-white h-auto border border-l-black font-bold text-lg text-black flex items-center justify-center p-2.5 w-[10%]"
          >
            <MdOutlineKeyboardArrowUp
              className={`transition-transform duration-300 ${
                isMoreOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          <button
            onClick={onXClick}
            className="bg-white font-bold text-sm text-black flex items-center justify-center p-2.5 w-[10%]"
          >
            x
          </button>
        </div>
      </div>
      <div className="flex w-full bg-white items-center pr-2 py-0 min-h-min">
        <audio
          ref={audioRef}
          src={episode.audioUrl}
          className="hidden"
          preload="metadata"
          playsInline
          webkit-playsInline
        />
        <div className="w-1/6 md:w-[10%] lg:w-[5%] aspect-square relative overflow-hidden">
          <Image
            src={episode.imageUrl}
            alt="Image of episode"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <button onClick={togglePlay} className="mx-4" disabled={isLoading}>
          {isLoading ? (
            <Loader className="text-black animate-spin" />
          ) : isPlaying ? (
            <Pause className="text-black" />
          ) : (
            <Play className="text-black" />
          )}
        </button>
        <div className="text-xs text-black mr-2">{formatTime(currentTime)}</div>
        <div className="flex-grow">
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-black rounded-full appearance-none cursor-pointer accent-black"
            style={{
              background: `linear-gradient(to right, white ${
                (currentTime / duration) * 100
              }%, #000 ${(currentTime / duration) * 100}%)`,
            }}
            disabled={isLoading}
          />
        </div>
        <div className="ml-2 text-black text-xs">{formatTime(duration)}</div>
      </div>
      <style jsx>{`
        input[type="range"] {
          -webkit-appearance: none;
          width: 100%;
          background: transparent;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          background: black;
          cursor: pointer;
          border-radius: 50%;
          margin-top: -7px; /* to vertically center the thumb */
        }
        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: black;
          cursor: pointer;
          border-radius: 50%;
          border: none;
        }
        input[type="range"]::-webkit-slider-runnable-track {
          width: 100%;
          height: 2px;
          cursor: pointer;
          background: #000000;
          border-radius: 1px;
        }
        input[type="range"]::-moz-range-track {
          width: 100%;
          height: 2px;
          cursor: pointer;
          background: #000000;
          border-radius: 1px;
        }
      `}</style>
    </div>
  );
};

export default AudioPlayer;
