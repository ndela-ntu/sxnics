import { IEpisode } from "@/models/Episode";
import { Pause, Play } from "lucide-react";
import Image from "next/image";
import { useAudioContext } from "@/context/AudioContext";
import Link from "next/link";

export default function EpisodeCard({
  episode,
  isActive,
  onImageClick,
  isPlaying,
}: {
  episode: IEpisode;
  isActive: boolean;
  onImageClick: (episode: IEpisode) => void;
  isPlaying: boolean;
}) {
  return (
    <div
      className={`${
        isActive && "bg-white text-black"
      } flex items-center w-full border p-2.5 space-x-2.5 md:space-x-5 lg:space-x-7.5`}
    >
      <div className="w-1/6 md:[10%] lg:w-[5%] aspect-square relative overflow-hidden rounded-full">
        <Image
          src={episode.imageUrl}
          alt="Image of episode"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
        <button
          className="flex items-center justify-center absolute inset-0 m-auto w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white"
          onClick={() => {
            onImageClick(episode);
            //updateIsPlaying(false);
          }}
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
          <span className="sr-only">{isPlaying ? "Pause" : "Play"} audio</span>
        </button>
      </div>
      <Link href={`/episodes/${episode.id}`}>
        <div className="flex flex-col w-full justify-start">
          <span className="overflow-ellipsis text-base">{episode.name}</span>
          <span className="overflow-ellipsis text-sm">
            {episode.artists.name}
          </span>
          <span className="bg-white text-xs text-black p-1">
            {episode.tag}
          </span>
        </div>
      </Link>
    </div>
  );
}
