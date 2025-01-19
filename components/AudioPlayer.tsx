"use client";
import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, Loader } from "lucide-react";
import Image from "next/image";
import { IEpisode } from "@/models/Episode";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

export default function AudioPlayer({
  episode,
  isPlaying,
  onTogglePlay,
  onXClick,
}: {
  episode: IEpisode;
  isPlaying: boolean;
  onTogglePlay: (value: boolean) => void;
  onXClick: () => void;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMoreOpen, setIsMoreOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
      setIsLoading(false);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    const handleEnded = () => {
      onTogglePlay(false);
      if (audio) {
        audio.currentTime = 0;
      }
    };

    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [episode, onTogglePlay]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying, episode]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      onTogglePlay(true);
    } else {
      audio.pause();
      onTogglePlay(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  return (
    <div className="w-full fixed bottom-0 right-0 z-10">
      <div className="relative">
        <div
          className={`${
            isMoreOpen ? "max-h-[500px]" : "max-h-0"
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
              <div className="w-full selection:flex items-end justify-start absolute m-auto bg-black/50 hover:bg-black/70 text-white p-5 text-lg">
                <div className="underline font-bold py-2.5">{episode.name}</div>
                <div className="whitespace-pre-wrap text-xs">
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
      <div className="flex w-full bg-white items-center pr-2 py-0">
        <audio ref={audioRef} src={episode.audioUrl} className="hidden" />
        <div className="w-1/4 md:w-[10%] lg:w-[5%] aspect-square relative overflow-hidden">
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
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1 bg-black rounded-full appearance-none cursor-pointer range-sm accent-black flex items-center justify-center"
          disabled={isLoading}
        />
        <div className="ml-2 text-black text-xs">{formatTime(duration)}</div>
      </div>
    </div>
  );
}

function formatTime(time: number): string {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
