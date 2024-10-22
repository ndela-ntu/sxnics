import { IRelease } from "@/models/Release";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Divider from "../Divider";

export default function ViewRelease({ release }: { release: IRelease }) {
  return (
    <div className="flex flex-col">
      <div className="flex space-x-2.5 bg-white text-black max-w-fit p-2.5">
        <span className="font-bold">{release.artist}</span>
        <span>-</span>
        <span>{release.name}</span>
      </div>
      <div className="relative aspect-square md:h-1/3 md:w-1/3 lg:h-1/4 lg:w-1/4">
        <Image
          src={release.imageUrl}
          alt="Image of episode"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <span className="mt-5">{release.about}</span>
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
