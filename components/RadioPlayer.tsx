"use client";

import { Montserrat } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";
import { IoIosPause, IoIosPlay } from "react-icons/io";
import io from "socket.io-client";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

const RadioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaSourceRef = useRef<MediaSource | null>(null);
  const sourceBufferRef = useRef<SourceBuffer | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const [nowPlaying, setNowPlaying] = useState<string | null>(null);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      // Create a new MediaSource
      const mediaSource = new MediaSource();
      mediaSourceRef.current = mediaSource;

      // Attach the MediaSource to the audio element
      audioElement.src = URL.createObjectURL(mediaSource);

      mediaSource.addEventListener("sourceopen", handleSourceOpen);
      mediaSource.addEventListener("sourceended", handleSourceEnd);
      mediaSource.addEventListener("sourceclose", handleSourceClose);
    }

    // Connect to Socket.IO server
    const socket = io("http://localhost:5000");

    socket.on("audioChunk", (chunk: ArrayBuffer) => {
      appendAudioChunk(chunk);
    });

    socket.on("nowPlaying", (currentTrack: { fileName: string }) => {
      const displayName = currentTrack.fileName.replace(/\.mp3$/, "");
      setNowPlaying(displayName);
    });


    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024); // 1024px is the default breakpoint for 'lg' in Tailwind
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      socket.disconnect();
      window.removeEventListener("resize", checkScreenSize);
      if (mediaSourceRef.current) {
        mediaSourceRef.current.removeEventListener(
          "sourceopen",
          handleSourceOpen
        );
        mediaSourceRef.current.removeEventListener(
          "sourceended",
          handleSourceEnd
        );
        mediaSourceRef.current.removeEventListener(
          "sourceclose",
          handleSourceClose
        );
      }
    };
  }, []);

  const handleSourceOpen = () => {
    const mediaSource = mediaSourceRef.current;
    if (mediaSource && mediaSource.sourceBuffers.length === 0) {
      const mimeType = "audio/mpeg"; // Adjust MIME type based on your audio format
      try {
        const sourceBuffer = mediaSource.addSourceBuffer(mimeType);
        sourceBufferRef.current = sourceBuffer;

        // Handle SourceBuffer events
        sourceBuffer.addEventListener("updateend", () => {});
      } catch (e) {
        console.error("Error creating SourceBuffer:", e);
      }
    }
  };

  const handleSourceEnd = () => {
    console.log("MediaSource ended");
  };

  const handleSourceClose = () => {
    console.log("MediaSource closed");
  };

  const appendAudioChunk = (chunk: ArrayBuffer) => {
    const sourceBuffer = sourceBufferRef.current;

    if (sourceBuffer && !sourceBuffer.updating) {
      try {
        sourceBuffer.appendBuffer(new Uint8Array(chunk));
      } catch (error) {
        console.error("Error appending audio chunk:", error);
      }
    } else {
      console.log("SourceBuffer is updating or unavailable.");
    }
  };

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
    <div className="text-white flex flex-col w-full my-2.5">
      <audio ref={audioRef} />
      <div className="bg-white text-black p-1 rounded-lg space-y-5">
        <div className="flex lg:flex-row justify-between">
          <button className="pr-5" onClick={handlePlayPause}>
            {isPlaying ? <IoIosPause /> : <IoIosPlay />}
          </button>
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
