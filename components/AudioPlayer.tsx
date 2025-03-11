import React, { useState, useRef, useEffect } from "react";
import { Loader, Pause, Play, X } from "lucide-react";
import { IEpisode } from "@/models/Episode";
import Image from "next/image";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { addPlayCount } from "@/lib/play-count-action";
import { IMergedEpisode } from "@/models/MergedEpisode";

interface AudioPlayerProps {
  episode: IMergedEpisode;
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
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const hasRunEffect = useRef(false);

  // Set media session metadata
  useEffect(() => {
    if ('mediaSession' in navigator && episode) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: episode.name,
        artist: episode.artists.name,
        album: "Sxnics Episodes", // You can customize this
        artwork: [
          { src: episode.imageUrl, sizes: '96x96', type: 'image/png' },
          { src: episode.imageUrl, sizes: '128x128', type: 'image/png' },
          { src: episode.imageUrl, sizes: '192x192', type: 'image/png' },
          { src: episode.imageUrl, sizes: '256x256', type: 'image/png' },
          { src: episode.imageUrl, sizes: '384x384', type: 'image/png' },
          { src: episode.imageUrl, sizes: '512x512', type: 'image/png' },
        ],
      });
    }
  }, [episode]);

  // Handle media session actions
  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => {
        onTogglePlay(true);
        audioRef.current?.play();
      });

      navigator.mediaSession.setActionHandler('pause', () => {
        onTogglePlay(false);
        audioRef.current?.pause();
      });

      navigator.mediaSession.setActionHandler('seekbackward', () => {
        if (audioRef.current) {
          audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10); // Seek backward by 10 seconds
        }
      });

      navigator.mediaSession.setActionHandler('seekforward', () => {
        if (audioRef.current) {
          audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 10); // Seek forward by 10 seconds
        }
      });

      navigator.mediaSession.setActionHandler('previoustrack', () => {
        // Handle previous track (if applicable)
      });

      navigator.mediaSession.setActionHandler('nexttrack', () => {
        // Handle next track (if applicable)
      });
    }
  }, [onTogglePlay, duration]);

  const handlePlayCount = async () => {
    try {
      await addPlayCount(episode.id);
    } catch (error) {
      console.error("Failed to add play count:", error);
    }
  };

  useEffect(() => {
    if (episode != null && !hasRunEffect.current) {
      handlePlayCount();
      hasRunEffect.current = true;
    }
  }, [episode.id]);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      if (isPlaying) {
        const playPromise = audioElement.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Playback prevented:", error);
            onTogglePlay(false);
          });
        }
      } else {
        audioElement.pause();
      }
    }
  }, [isPlaying, onTogglePlay]);

  const updateProgress = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      setCurrentTime(audioElement.currentTime);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleEnded = () => {
    onTogglePlay(false); // Stop the audio when it ends
  };

  return (
    <div className="w-full fixed bottom-0 right-0 z-10">
      <div className="relative">
        <div
          className={`${
            isMoreOpen ? "max-h-[700px]" : "max-h-0"
          } overflow-hidden transition-all duration-500 ease-in-out absolute bottom-full left-0 right-0 z-10`}
        >
          <div>
            <div className="aspect-square relative overflow-hidden">
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
          src={episode.mediaUrl}
          onTimeUpdate={updateProgress}
          onLoadedMetadata={(e) => {
            const target = e.target as HTMLAudioElement;
            setDuration(target.duration);
          }}
          onLoadedData={() => setIsLoading(false)} // Audio has loaded
          onLoadStart={() => setIsLoading(true)} // Loading starts
          onEnded={handleEnded} // Handle the end of the audio
          className="hidden"
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
        <button
          onClick={() => onTogglePlay(!isPlaying)}
          className="mx-4"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? (
            <Loader className="text-black animate-spin" />
          ) : isPlaying ? (
            <Pause className="text-black" />
          ) : (
            <Play className="text-black" />
          )}
        </button>

        <div className="flex-grow flex items-center space-x-2">
          <div className="text-xs text-black mr-2">
            {formatTime(currentTime)}
          </div>
          <div className="flex-grow">
            <input
              type="range"
              min={0}
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-black rounded-full appearance-none cursor-pointer accent-black"
              style={{
                background: `linear-gradient(to right, gray ${
                  (currentTime / duration) * 100
                }%, #000 ${(currentTime / duration) * 100}%)`,
              }}
            />
          </div>
          <div className="ml-2 text-black text-xs">{formatTime(duration)}</div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;