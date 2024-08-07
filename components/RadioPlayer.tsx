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
  const [volume, setVolume] = useState<number>(1);

  useEffect(() => {
    const socket = io(API_URL); // Adjust the URL as per your server configuration

    socket.on("nowPlaying", (currentTrack: { fileName: string }) => {
      const displayName = currentTrack.fileName.replace(/\.mp3$/, "");
      setNowPlaying(displayName);
    });

    const audio = audioRef.current;
    if (audio) {
      audio.src = `${API_URL}/stream`;
    }

    return () => {
      socket.disconnect();
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

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const newVolume = parseFloat(event.target.value);
    if (audio) {
      audio.volume = newVolume;
    }
    setVolume(newVolume);
  };

  return (
    <div className="text-white flex flex-col justify-center items-center">
      <h1 className={`${montserrat.className} text-5xl p-5`}>SXNICS</h1>
      <audio ref={audioRef} />
      <div className="bg-white text-black p-5 rounded-lg space-y-5">
        <div className="flex space-x-5">
          <button onClick={handlePlayPause}>
            {isPlaying ? <IoIosPause /> : <IoIosPlay />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="accent-black"
          />
        </div>
        <div className="relative overflow-hidden h-6">
          <p
            className={`absolute whitespace-nowrap now-playing ${montserrat.className}`}
          >
            {nowPlaying ? nowPlaying : "Loading..."}
          </p>
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
        .now-playing {
          animation: slide 10s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default RadioPlayer;
