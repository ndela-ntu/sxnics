"use client";

import { IArtist } from "@/models/Artist";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import Image from "next/image";

export default function CuratorsCarousel({
  curators,
}: {
  curators: IArtist[];
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
    <div className="border py-2">
      <Carousel
        plugins={[Autoplay({ delay: 3500 })]}
        setApi={setApi}
        opts={{ align: "start" }}
        className="w-full h-full"
      >
        <CarouselContent className="-ml-1">
          {curators.map((curator, index) => (
            <CarouselItem key={index} className="basis-1/3 pl-1">
              <div className="h-full flex flex-col">
                <Card className="border-none p-0 bg-transparent text-black h-full flex-1">
                  <CardContent className="flex bg-transparent aspect-square items-center justify-center p-0">
                    <Link 
                      href={`/artists/${curator.id}`}
                      className="block w-full h-full"
                    >
                      <div className="w-full h-full rounded-full overflow-hidden relative">
                        <Image
                          src={curator.imageUrl}
                          alt="Image of artist"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                    </Link>
                  </CardContent>
                </Card>
                <div className="text-center">
                  <span className="text-white font-bold text-sm">{curator.name}</span>
                </div>
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