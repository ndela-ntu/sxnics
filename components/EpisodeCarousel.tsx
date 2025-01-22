"use client";

import { IEpisode } from "@/models/Episode";
import Image from "next/image";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent, CardTitle } from "./ui/card";
import { useCallback, useContext, useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import Link from "next/link";
import { useAudioContext } from "@/context/AudioContext";

export default function EpisodeCarousel({
  episodes,
}: {
  episodes: IEpisode[];
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const { isRadioPlaying, setIsRadioPlaying, activeEpisode, setActiveEpisode } =
    useAudioContext();

  useEffect(() => {
    if (isRadioPlaying && activeEpisode) {
      setActiveEpisode((prev) => ({ ...prev!, isPlaying: false }));
    }
  }, [isRadioPlaying]);

  const onInit = useCallback(() => {
    setCount(0);
    setCurrent(0);
  }, []);

  const onScroll = useCallback(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) {
      return;
    }

    onScroll();
    api.on("init", onInit);
    api.on("scroll", onScroll);
    api.on("reInit", onScroll);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    return () => {
      api.off("init", onInit);
      api.off("scroll", onScroll);
      api.off("reInit", onScroll);
    };
  }, [api, onInit, onScroll]);

  return (
    <div>
      <Carousel setApi={setApi} opts={{ align: "center" }} className="w-full">
        <CarouselContent className="">
          {episodes.map((episode, index) => (
            <CarouselItem
              key={index}
              className=" basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <div className="">
                <Card className="rounded-none border-none p-0 bg-white text-black">
                  <CardTitle className="flex flex-col text-sm py-2 px-2 font-normal">
                    <span className="text-xs">{episode.name}</span>
                    <span>{episode.artists.name}</span>
                  </CardTitle>
                  <CardContent className="flex bg-transparent aspect-square items-center justify-center p-0">
                    <div className="w-full h-full">
                      <div className="aspect-square relative overflow-hidden">
                        <Link href={`episodes/${episode.id}`}>
                          <Image
                            src={episode.imageUrl}
                            alt="Image of episode"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                          />
                        </Link>
                        {activeEpisode?.id === episode.id ? (
                          <button
                            className="bottom-0 right-0 flex items-center justify-center absolute m-auto w-10 h-7 bg-white text-black"
                            onClick={() => {
                              if (activeEpisode.isPlaying) {
                                setActiveEpisode((_) => ({
                                  ...episode,
                                  isPlaying: false,
                                }));
                              } else {
                                setActiveEpisode((_) => ({
                                  ...episode,
                                  isPlaying: true,
                                }));
                                setIsRadioPlaying(false);
                              }
                            }}
                          >
                            {activeEpisode.isPlaying ? (
                              <Pause className="h-5 w-5" />
                            ) : (
                              <Play className="h-5 w-5" />
                            )}
                            <span className="sr-only">
                              {activeEpisode.isPlaying ? "Pause" : "Play"} audio
                            </span>
                          </button>
                        ) : (
                          <button
                            className="bottom-0 right-0 flex items-center justify-center absolute m-auto w-10 h-7 bg-white text-black"
                            onClick={() => {
                              setActiveEpisode((_) => ({
                                ...episode,
                                isPlaying: true,
                              }));
                              setIsRadioPlaying(false);
                            }}
                          >
                            <Play className="h-5 w-5" />
                            <span className="sr-only">Play audio</span>
                          </button>
                        )}
                        <span className="flex items-center justify-center text-sm px-1 h-7 absolute bottom-0 left-0 bg-black/50 hover:bg-black/70 text-white">
                          {episode.tag}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="mt-1 flex items-center justify-center space-x-2.5">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              index === current ? "bg-white w-4" : "bg-white/65"
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
