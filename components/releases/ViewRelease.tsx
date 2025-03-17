import { IRelease } from "@/models/Release";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Divider from "../Divider";

export default function ViewRelease({ release }: { release: IRelease }) {
  return (
    <div className="flex flex-col w-full">
      <h1 className="text-base">Release</h1>
      <div className="flex flex-col lg:flex-row space-x-5">
        <div className="lg:w-[40%] h-full flex flex-col">
          <div className="w-full justify-between flex space-x-2.5 bg-white text-black p-2.5 text-sm">
            <span className="font-bold">{release.artist}</span>
            <span>-</span>
            <span>{release.name}</span>
          </div>
          <div className="border relative aspect-square w-full">
            <Image
              src={release.imageUrl}
              alt="Image of episode"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        </div>
        <span className="lg:w-1/2 mt-5 lg:mt-0 whitespace-pre-wrap text-sm">
          {release.about}
        </span>
      </div>
      <Divider />

      <div className="max-w-fit">
        <a
          href={release.purchaseLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-white text-black"
        >
          Buy
          <ExternalLink className="ml-2 h-4 w-4" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </div>
  );
}
