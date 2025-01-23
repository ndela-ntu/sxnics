"use client";

import { Montserrat } from "next/font/google";
import React, { useContext, useEffect, useRef, useState } from "react";
import { IoIosPause, IoIosPlay } from "react-icons/io";
import { useAudioContext } from "@/context/AudioContext";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

const RadioPlayer: React.FC = () => {
  const { setIsRadioPlaying, isRadioPlaying, activeEpisode, setActiveEpisode, setIsEpisodePlaying, isEpisodePlaying } = useAudioContext();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const [nowPlaying, setNowPlaying] = useState<string | null>(null);

  useEffect(() => {
    const audioElement = audioRef.current;
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024); // 1024px is the default breakpoint for 'lg' in Tailwind
    };
    checkScreenSize();
  }, []);

  useEffect(() => {
    if (!isRadioPlaying) {
      audioRef?.current?.pause();
      setIsPlaying(false);
    }
  }, [isRadioPlaying]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        setIsRadioPlaying(false);
        audio.pause();
      } else {
        setIsRadioPlaying(true);
        if (activeEpisode) {
          setIsEpisodePlaying(false);
          //setActiveEpisode((prev) => ({...prev!, isPlaying: false}));
        }
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="text-white flex flex-col w-full my-2.5">
      <audio ref={audioRef} />
      <div className="bg-white text-black px-2 py-1 space-y-5">
        <div className="flex lg:flex-row justify-between">
          <div className="pr-2 items-center flex space-x-2 ">
          <div className="h-2 w-2 bg-red-500 rounded-full" />
            <button onClick={handlePlayPause}>
              {isPlaying ? <IoIosPause /> : <IoIosPlay />}
            </button>
          </div>
          <div className="relative overflow-hidden h-6 w-full">
            <p
              className={`absolute whitespace-nowrap w-full ${
                montserrat.className
              } ${isSmallScreen ? "animate-slide" : ""}`}
            >
              {nowPlaying ? nowPlaying : "Loading..."}
            </p>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-slide {
          animation: slide 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default RadioPlayer;
