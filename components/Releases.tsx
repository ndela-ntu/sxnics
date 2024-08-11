"use client";

import Release from "@/models/Release";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Releases({ releases }: { releases: Release[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === releases.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [releases.length]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="relative w-full max-w-[80%] sm:max-w-[600px] h-[300px] sm:h-[400px] overflow-hidden mx-auto">
        {releases.map((release, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={release.coverURL}
              alt={`Slide ${index + 1}`}
              fill
              style={{ objectFit: "contain" }}
              priority={index === 0}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center">
        <span className="font-bold text-2xl">{releases.at(currentIndex)?.artist}</span>
        <span>{releases.at(currentIndex)?.album}</span>
      </div>
    </div>
  );
}
