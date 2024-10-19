"use client";

import { IRelease } from "@/models/Release";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";

export default function ReleasesCarousel({
  releases,
}: {
  releases: IRelease[];
}) {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
      className="w-full h-full"
    >
      <CarouselContent className="w-full p-0 -ml-0 ">
        {releases.map((release) => (
          <CarouselItem
            key={release.id}
            className="border-r-2 border-black w-full pl-0 md:basis-1/3 lg:basis-1/4"
          >
            <div className="">
              <Card className="w-full rounded-none border-none p-0">
                <CardTitle className="text-sm py-2 pl-2">
                  {release.name}
                </CardTitle>
                <CardContent className="flex bg-transparent aspect-square items-center justify-center p-0">
                  <div className="w-full h-full">
                    <div className="aspect-square relative overflow-hidden">
                      <Link href={`release-radar/${release.id}`}>
                        <Image
                          src={release.imageUrl}
                          alt="Image of episode"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </Link>
                      <span className="text-sm p-2.5 absolute bottom-0 left-0 bg-black/50 hover:bg-black/70 text-white">
                        {release.tag}
                      </span>
                      <span className="text-sm p-2.5 absolute bottom-0 right-0 bg-black/50 hover:bg-black/70 text-white">
                        {release.type} Release
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-white text-black text-sm py-2 pl-2">
                  {release.artist}
                </CardFooter>
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
