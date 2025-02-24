"use client";

import { IBlogPost } from "@/models/BlogPost";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState, useEffect } from "react";

export default function BlogPostCarousel({
  blogPosts,
}: {
  blogPosts: IBlogPost[];
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
      <Carousel setApi={setApi} opts={{ align: "center" }} className="w-full">
        <CarouselContent>
          {blogPosts.map((blogPost, index) => {
            return (
              <CarouselItem
                key={index}
                className="basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="border">
                  <Link href={`/blog/${blogPost.slug}`}>
                    <Card className="w-full border-none bg-white text-black rounded-none p-0">
                      <CardContent className="flex bg-transparent aspect-square items-center justify-center p-0">
                        <div className="w-full h-full">
                          <div className="aspect-square relative overflow-hidden">
                            <Image
                              src={`https:${blogPost.coverImage.fields.file.url}`}
                              alt="Image of episode"
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover"
                            />
                            {/* Gradient overlay from transparent to black */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

                            <span className="flex items-start justify-center px-1 py-2 h-auto absolute bottom-0 left-0 md:bottom-5 w-full text-white font-bold text-sm md:text-xl">
                              {blogPost.title}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </CarouselItem>
            );
          })}
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
