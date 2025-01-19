'use client';

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
            const previewTitle =
              blogPost.title.slice(0, 20) +
              (blogPost.title.length >= 20 ? "..." : "");
            return (
              <CarouselItem
                key={index}
                className="basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="">
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
                            <span className="flex items-start justify-center px-1 h-auto absolute bottom-0 left-0 bg-black/50 hover:bg-black/70 text-white md:font-bold md:text-lg">
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
