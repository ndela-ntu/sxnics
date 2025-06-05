import { supabase } from "@/utils/supabase";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Artists/Curators",
    description:
      "Showcasing our curators and resident djs",
    openGraph: {
      title: "Artists",
      description:
        "Showcasing our curators and resident djs",
      images: [
        {
          url: "../LOGO.png", 
          width: 1200,
          height: 630,
          alt: "SXNICS LOGO",
        },
      ],
    },
  };
  

export default async function Page() {
  const { data: artists, error } = await supabase.from("artists").select("*");

  if (error) {
    return (
      <div className="text-red-500">{`An error occurred: ${error.message}`}</div>
    );
  }

  return (
    <div className="flex flex-col pb-10">
      <h2>Artists / Curators</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
        {artists.map((artist) => (
          <Link
            href={`/artists/${artist.id}`}
            key={artist.id}
            className="flex flex-col w-full p-2.5 bg-white text-black space-y-2.5"
          >
            <div className="w-full md:[10%] lg:w-[5%] aspect-square relative overflow-hidden">
              <Image
                src={artist.imageUrl}
                alt="Image of artist"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-base md:text-lg font-semibold">{artist.name}</span>
              <p className="text-xs md:text-sm">{artist.bio.length > 100 ? artist.bio.slice(0, 100) + "..." : artist.bio}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
