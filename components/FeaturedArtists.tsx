import Artist from "@/models/Artist";
import Image from "next/image";

export default function FeaturedArtists({ artists }: { artists: Artist[] }) {
  return (
    <div className="flex flex-col">
      {artists.map((artist) => (
        <div className="border p-5">
          <div
            style={{ position: "relative", width: "200px", height: "200px" }}
          >
            <Image
              src={artist.avatarURL}
              alt="Picture of the author"
              sizes="200px"
              fill
              style={{
                objectFit: "contain",
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">{artist.name}</span>
            <span>{artist.location}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
