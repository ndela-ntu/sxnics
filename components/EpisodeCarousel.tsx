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
import { IMergedEpisode } from "@/models/MergedEpisode";

export default function EpisodeCarousel({
  episodes,
}: {
  episodes: IMergedEpisode[];
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const {
    isRadioPlaying,
    setIsRadioPlaying,
    activeEpisode,
    setActiveEpisode,
    isEpisodePlaying,
    setIsEpisodePlaying,
  } = useAudioContext();
  const [pageCount, setPageCount] = useState(0);
  const itemsPerView = 3;

  useEffect(() => {
    if (isRadioPlaying && activeEpisode) {
      setActiveEpisode((prev) => ({ ...prev!, isPlaying: false }));
    }
  }, [isRadioPlaying]);

  useEffect(() => {
    setPageCount(Math.ceil(episodes.length / itemsPerView));
  }, [episodes]);

  const onInit = useCallback(() => {
    if (!api) return;
    setCount(episodes.length);
    setCurrent(0);
  }, [api, episodes.length]);

  const onScroll = useCallback(() => {
    if (!api) return;
    // Get current scroll position and convert to page index
    const snapIndex = api.selectedScrollSnap();
    const currentPage = Math.floor(snapIndex / itemsPerView);
    setCurrent(currentPage);
  }, [api, itemsPerView]);

  useEffect(() => {
    if (!api) {
      return;
    }

    onInit();
    api.on("init", onInit);
    api.on("scroll", onScroll);
    api.on("reInit", onInit);
    api.on("select", onScroll);

    return () => {
      api.off("init", onInit);
      api.off("scroll", onScroll);
      api.off("reInit", onInit);
      api.off("select", onScroll);
    };
  }, [api, onInit, onScroll]);

  return (
    <div className="w-full max-w-[calc(100vw-2rem)] mx-auto">
      <Carousel
         setApi={setApi}
         opts={{
           align: "start",
           slidesToScroll: itemsPerView, // Keep single item scrolling for smoother experience
           containScroll: "keepSnaps",
         }}
         className="w-full"
      >
        <CarouselContent className="-ml-1">
          {episodes.map((episode, index) => (
            <CarouselItem key={index} className="basis-1/3 pl-1">
              <div className="h-full">
                <Card className="rounded-none border-none p-0 bg-white text-black h-full">
                  <CardTitle className="flex flex-col text-sm py-2 px-2 font-normal">
                    <span className="text-xs">{episode.name}</span>
                  </CardTitle>
                  <CardContent className="flex bg-transparent aspect-square items-center justify-center p-0">
                    <div className="w-full h-full">
                      <div className="aspect-square relative overflow-hidden">
                        <Link
                          href={`/episodes/${episode.id}/?type=${episode.type}`}
                        >
                          <Image
                            src={episode.imageUrl}
                            alt="Image of episode"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                          />
                        </Link>
                        {episode.type === "audio" &&
                          (activeEpisode?.id === episode.id ? (
                            <button
                              className="bottom-0 right-0 flex items-center justify-center absolute m-auto w-10 h-7 bg-white text-black"
                              onClick={() => {
                                if (
                                  activeEpisode?.id === episode.id &&
                                  isEpisodePlaying
                                ) {
                                  setIsEpisodePlaying(false);
                                } else {
                                  setIsEpisodePlaying(true);
                                  setIsRadioPlaying(false);
                                }
                              }}
                            >
                              {activeEpisode.id === episode.id &&
                              isEpisodePlaying ? (
                                <Pause className="h-5 w-5" />
                              ) : (
                                <Play className="h-5 w-5" />
                              )}
                            </button>
                          ) : (
                            <button
                              className="bottom-0 right-0 flex items-center justify-center absolute m-auto w-10 h-7 bg-white text-black"
                              onClick={() => {
                                setActiveEpisode(episode);
                                setIsEpisodePlaying(true);
                                setIsRadioPlaying(false);
                              }}
                            >
                              <Play className="h-5 w-5" />
                              <span className="sr-only">Play audio</span>
                            </button>
                          ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
      <div className="mt-1 flex items-center justify-center space-x-2.5">
        {Array.from({ length: pageCount }).map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              index === current ? "bg-white w-4" : "bg-white/65"
            }`}
            onClick={() => api?.scrollTo(index * itemsPerView)}
          />
        ))}
      </div>
    </div>
  );
}