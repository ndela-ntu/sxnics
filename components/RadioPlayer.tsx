"use client";

import React, { useEffect, useRef, useState } from "react";
import { IoIosPause, IoIosPlay } from "react-icons/io";
import io from "socket.io-client";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

const API_URL = "https://sxnics-server.onrender.com";

function RadioPlayer() {
  const [nowPlaying, setNowPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  useEffect(() => {
    const socket = io(API_URL);

    socket.on("nowPlaying", (currentTrack: { fileName: string }) => {
      const displayName = currentTrack.fileName.replace(/\.mp3$/, "");
      setNowPlaying(displayName);
    });

    const audio = audioRef.current;
    if (audio) {
      audio.src = `${API_URL}/stream`;
    }

    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024); // 1024px is the default breakpoint for 'lg' in Tailwind
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      socket.disconnect();
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="text-white flex flex-col">
      <audio ref={audioRef} />
      <div className="bg-white text-black p-5 rounded-lg space-y-5 mx-5">
        <div className="flex lg:flex-row justify-between">
          <button className="pr-5" onClick={handlePlayPause}>
            {isPlaying ? <IoIosPause /> : <IoIosPlay />}
          </button>
          <div className="relative overflow-hidden h-6 w-full">
            <p
              className={`absolute whitespace-nowrap w-full ${montserrat.className} ${isSmallScreen ? 'animate-slide' : ''}`}
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
}

export default RadioPlayer;