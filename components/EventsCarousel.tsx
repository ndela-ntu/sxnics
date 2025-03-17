"use client";

import { IRelease } from "@/models/Release";
import {
  Card,
  CardContent,
  CardTitle,
} from "./ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { IEvent } from "@/models/Event";
import { formatDate } from "@/lib/datetime-formatter";

export default function EventsCarousel({
  events,
}: {
  events: IEvent[];
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

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
      <Carousel
        plugins={[
          Autoplay({
            delay: 2500,
          }),
        ]}
        setApi={setApi}
        opts={{ align: "center" }}
        className="w-full h-full"
      >
        <CarouselContent className="">
          {events.map((event) => (
            <CarouselItem
              key={event.id}
              className="basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <div className="">
                <Card className="w-full rounded-none border-none p-0">
                  <CardTitle className="flex justify-between py-2 px-2 space-x-5">
                    <span className="text-xs font-bold truncate">{event.name}</span>
                    <span className="text-xs">{formatDate(new Date(event.eventDate))}</span>
                  </CardTitle>
                  <CardContent className="flex bg-transparent aspect-square items-center justify-center p-0">
                    <div className="w-full h-full">
                      <div className="aspect-square relative overflow-hidden">
                        <Link href={`events/${event.id}`}>
                          <Image
                            src={event.coverUrl}
                            alt="Image of episode"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                          />
                        </Link>
                        <span className="flex items-center justify-center text-sm px-1 h-7 absolute bottom-0 left-0 bg-black/50 hover:bg-black/70 text-white">
                          {event.location}
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
