import { IEpisode } from "@/models/Episode";
import { Pause, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ShareButton from "./ShareButton";
import { IMergedEpisode } from "@/models/MergedEpisode";
import { FaYoutube } from "react-icons/fa";

export default function EpisodeCard({
  episode,
  isActive,
  onImageClick,
  isPlaying,
}: {
  episode: IMergedEpisode;
  isActive: boolean;
  onImageClick: (episode: IMergedEpisode) => void;
  isPlaying: boolean;
}) {
  return (
    <div
      className={`${
        isActive && "bg-white text-black"
      } flex items-center w-full border p-2.5 space-x-2.5 md:space-x-5 lg:space-x-7.5`}
    >
      <div className="w-1/6 md:[10%] lg:w-[5%] aspect-square relative overflow-hidden">
        <Image
          src={episode.imageUrl}
          alt="Image of episode"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
        {episode.type === "audio" && (
          <button
            className="flex items-center justify-center absolute inset-0 m-auto w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white"
            onClick={() => {
              onImageClick(episode);
              //setIsRadioPlaying(false);
            }}
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6" />
            )}
            <span className="sr-only">
              {isPlaying ? "Pause" : "Play"} audio
            </span>
          </button>
        )}
      </div>
      <div className="w-full flex flex-row items-center justify-between">
        <Link href={`/episodes/${episode.id}/?type=${episode.type}`}>
          <div className="flex flex-col w-full justify-start">
            <span className="overflow-ellipsis text-sm">{episode.name}</span>
            <span className="overflow-ellipsis text-base">
              {episode.artists.name}
            </span>
            <span
              className={`${
                isActive ? "bg-black text-white" : "bg-white text-black"
              } text-xs p-1`}
            >
              {episode.tag}
            </span>
          </div>
        </Link>
        <div className="flex space-x-5">
          {episode.type === "video" && (
            <a
              href={episode.mediaUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                <FaYoutube className="h-10 w-10" />
              </span>
            </a>
          )}
          <ShareButton
            mixTitle={episode.name}
            artistName={episode.artists.name}
            mixUrl={`https://sxnics.com/episodes/${episode.id}`}
          />
        </div>
      </div>
    </div>
  );
}
