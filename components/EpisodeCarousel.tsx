"use client";

import { IEpisode } from "@/models/Episode";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent, CardTitle } from "./ui/card";
import { useState } from "react";
import { Pause, Play } from "lucide-react";

export default function EpisodeCarousel({
  episodes,
}: {
  episodes: IEpisode[];
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <Carousel
      opts={{
        align: "center",
      }}
      className="w-full"
    >
      <CarouselContent className="">
        {episodes.map((episode, index) => (
          <CarouselItem
            key={index}
            className=" basis-1/2 md:basis-1/3 lg:basis-1/4"
          >
            <div className="">
              <Card className="rounded-none border-none p-0 bg-white text-black">
                <CardTitle className="text-sm py-2 pl-2">
                  {episode.name}
                </CardTitle>
                <CardContent className="flex bg-transparent aspect-square items-center justify-center p-0">
                  <div className="w-full h-full">
                    <div className="aspect-square relative overflow-hidden">
                      <Image
                        src={episode.imageUrl}
                        alt="Image of episode"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                      <button
                        className="bottom-0 right-0 flex items-center justify-center absolute m-auto w-10 h-7 bg-white text-black"
                        onClick={() => {}}
                      >
                        {isPlaying ? (
                          <Pause className="h-5 w-5" />
                        ) : (
                          <Play className="h-5 w-5" />
                        )}
                        <span className="sr-only">
                          {isPlaying ? "Pause" : "Play"} audio
                        </span>
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
