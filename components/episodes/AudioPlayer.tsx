import React, { useRef, useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import Image from "next/image";
import { IEpisode } from "@/models/Episode";
import { FaArrowUp } from "react-icons/fa";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

export default function AudioPlayer({
  episode,
  isPlaying,
  onTogglePlay,
  onXClick,
}: {
  episode: IEpisode & { isPlaying: boolean };
  isPlaying: boolean;
  onTogglePlay: (value: boolean) => void;
  onXClick: () => void;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  // const [isPlaying, setIsPlaying] = useState(episode.isPlaying);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);

    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
    };
  }, [episode]);

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
      console.log(isPlaying);
      audio.play();
      onTogglePlay(true);
    } else {
      console.log(isPlaying);
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
    <div className="w-full fixed bottom-0 right-0">
      <div className="flex items-end justify-end h-[5%]">
        <button
          onClick={() => {}}
          className="bg-white h-auto border border-l-black font-bold text-lg text-black flex items-center justify-center p-2.5 w-[10%]"
        >
          <MdOutlineKeyboardArrowUp />
        </button>
        <button
          onClick={onXClick}
          className="bg-white font-bold text-sm text-black  flex items-center justify-center p-2.5 w-[10%]"
        >
          x
        </button>
      </div>
      <div className="flex  w-full bg-white items-center px-1 py-4">
        <audio ref={audioRef} src={episode.audioUrl} className="hidden" />
        <div className="w-1/6 md:w-[10%] lg:w-[5%] aspect-square relative overflow-hidden">
          <Image
            src={episode.imageUrl}
            alt="Image of episode"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <button onClick={togglePlay} className="mx-4">
          {isPlaying ? (
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
          className="w-full h-1 bg-black rounded-full appearance-none cursor-pointer range-sm accent-black"
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
