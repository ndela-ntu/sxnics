import { IRelease } from "@/models/Release";
import Link from "next/link";
import Image from "next/image";

export default function ReleaseCard({ release }: { release: IRelease }) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="relative aspect-square">
        <Link href={`/release-radar/${release.id}`}>
          <Image
            src={release.imageUrl}
            alt="Image of release"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </Link>
      </div>
      <div className="flex space-x-2.5">
        <span className="font-bold">{release.artist}</span>
        <span>-</span>
        <span>{release.name}</span>
      </div>
    </div>
  );
}
